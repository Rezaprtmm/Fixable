const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const { MongoClient } = require("mongodb");

// URL Koneksi MongoDB
const uri = "mongodb://localhost:27017"; // Ubah sesuai dengan URL MongoDB Anda
const databaseName = "bengkel-it";
const accountCollection = "account";
const reserveCollection = "reservation";
const priceCollection = "pricelist";
const port = 3001;

// Buat instance MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function insertSignUp(fullName, userName, email, nim, password) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(accountCollection);
  // const databasesList = await client.db().admin().listDatabases();
  // const databaseExists = databasesList.databases.some((db) => db.name === databaseName);
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some(
    (collection) => collection.name === accountCollection
  );

  if (!collectionExists) {
    await db.createCollection(accountCollection);
  }

  const idCheck = await collection.find({ _id: nim }).toArray();
  const unameCheck = await collection.find({ username: userName }).toArray();
  const emailCheck = await collection.find({ email: email }).toArray();
  const currentTime = Date.now();
  const currentDate = new Date(currentTime);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const DATE = `${day}/${month}/${year}`;

  if (idCheck.length == 0 && emailCheck == 0 && unameCheck == 0) {
    const dataToInsert = [
      {
        _id: nim,
        fullName: fullName,
        username: userName,
        email: email,
        datecreated: DATE,
        password: password,
        active: true,
        role: "Member/Customer",
      },
    ];
    const result = await collection.insertMany(dataToInsert);
    return true;
  } else if (idCheck.length != 0) {
    return "nim-exist";
  } else {
    return "data-exist";
  }
}

async function initializeData() {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(priceCollection);
  // const databasesList = await client.db().admin().listDatabases();
  // const databaseExists = databasesList.databases.some((db) => db.name === databaseName);
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some(
    (collection) => collection.name === priceCollection
  );

  if (!collectionExists) {
    await db.createCollection(priceCollection);
  }

  try {
    const item = [
      "Windows",
      "MacOS",
      "Display",
      "RAM",
      "HDD",
      "SSD",
      "Battery",
      "Cooling System",
      "Motherboard",
      "Keyboard",
      "Touchpad",
      "Frontend",
      "Backend",
      "Fullstack",
      "UI/UX",
    ];
    const price = [
      "1000000",
      "1500000",
      "2000000",
      "500000",
      "350000",
      "550000",
      "1000000",
      "1500000",
      "5000000",
      "2000000",
      "750000",
      "1000000",
      "1250000",
      "3750000",
      "1500000",
    ];
    const dataToInsert = [];
    item.forEach(function (element, index) {
      if (index < 3) {
        dataToInsert.push({
          _id: `${index + 1}`,
          name: element,
          type: "Software Repair",
          price: price[index],
        });
      } else if (index >= 3 && index < 11) {
        dataToInsert.push({
          _id: `${index + 1}`,
          name: element,
          type: "Hardware Repair",
          price: price[index],
        });
      } else if (index >= 11 && index < 15) {
        dataToInsert.push({
          _id: `${index + 1}`,
          name: element,
          type: "Web/App Creation",
          price: price[index],
        });
      }
    });
    const result = await collection.insertMany(dataToInsert);
    return true;
  } catch (e) {
    return true;
  }
}

async function editUserProfile(username, phone, email, customerID) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(accountCollection);

  const filter = { _id: customerID };
  const updateDocument = {
    $set: { username: username, phonenumber: phone, email: email },
  };
  const dataToInsert = await collection.updateOne(filter, updateDocument);
  return true;
}

async function activeUser() {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(accountCollection);
  const currentUser = await session.find({ active: true }).toArray();
  if (currentUser.length != 0) {
    return currentUser[0].username;
  } else {
    return false;
  }
}

async function checkReserve(reserveId, username) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const currentUser = await session
    .find({ _id: reserveId.trim(), username: username, ispaid: false })
    .toArray();
  if (currentUser.length != 0) {
    return true;
  } else {
    return false;
  }
}

async function fetchActiveReserve(username) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const activeForm = await session
    .find({ username: username, ispaid: false })
    .toArray();
  if (activeForm.length != 0) {
    return activeForm;
  } else {
    return false;
  }
}

async function getPriceBil(username, reserveId) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const getForm = await session
    .find({ _id: reserveId.trim(), username: username, ispaid: false })
    .toArray();
  if (getForm.length != 0) {
    return getForm;
  } else {
    return false;
  }
}

async function getUserStat(username) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const reserveForm = await session
    .find({ username: username, status: "complete" })
    .toArray();
  const completedForm = await session
    .find({ username: username, ispaid: true })
    .toArray();
  const reviewForm = await session
    .find({ username: username, review: "complete" })
    .toArray();
  const reserveStat = reserveForm.length;
  const completedStat = completedForm.length;
  const reviewStat = reviewForm.length;
  const overall = [reserveStat, completedStat, reviewStat];
  return overall;
}

async function checkUnique(uniqueCode, username) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const currentUser = await session
    .find({
      uniquecode: uniqueCode.trim(),
      username: username,
      ispaid: true,
      review: "pending",
    })
    .toArray();
  if (currentUser.length != 0) {
    const filter = { uniquecode: uniqueCode.trim(), username: username };
    const updateDocument = {
      $set: { review: "incomplete" },
    };
    const dataToInsert = await session.updateOne(filter, updateDocument);
    return true;
  } else {
    return false;
  }
}

async function activeUser1() {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(accountCollection);
  const currentUser = await session.find({ active: true }).toArray();
  if (currentUser.length != 0) {
    return currentUser[0].username;
  } else {
    return false;
  }
}

async function getPaymentHistory(getUsername) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const paymentHistory = await session
    .find({ ispaid: true, username: getUsername })
    .toArray();
  if (paymentHistory.length != 0) {
    return paymentHistory;
  } else {
    return false;
  }
}

async function retrieveUserReview(getUsername, request) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  var userReview;
  if (request == "validation") {
    userReview = await session
      .find({ username: getUsername, ispaid: true, review: "incomplete" })
      .toArray();
  } else {
    userReview = await session
      .find({ username: getUsername, ispaid: true })
      .toArray();
  }
  if (userReview.length != 0) {
    return userReview;
  } else {
    return false;
  }
}

async function fetchAllReview() {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const userReview = await session.find({ review: "complete" }).toArray();
  if (userReview.length != 0) {
    return userReview;
  } else {
    return false;
  }
}

async function retrieveUserProfile(userName) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(accountCollection);
  const userProfile = await session.find({ username: userName }).toArray();
  if (userProfile.length != 0) {
    return userProfile;
  } else {
    return false;
  }
}

async function removeIncompleteForm(username) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const deleteIncomplete = await collection.deleteMany({
    username: username,
    status: "incomplete",
    purgable: true,
  });
  return true;
}

async function removeIncompleteReview(userName) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const filter = { username: userName.trim(), review: "incomplete" };
  const updateDocument = {
    $set: { review: "pending" },
  };
  const dataToInsert = await collection.updateOne(filter, updateDocument);
  return true;
}

async function cancelPurgeForm(username) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const getIncomplete = await collection
    .find({ username: username.trim(), status: "incomplete", purgable: true })
    .toArray();

  if (getIncomplete.length != 0) {
    const filter = { username: username.trim(), status: "incomplete" };
    const updateDocument = {
      $set: { purgable: false },
    };
    const dataToInsert = await collection.updateOne(filter, updateDocument);
    return true;
  } else {
    return false;
  }
}

async function reservation(
  nim,
  fullname,
  email,
  major,
  phoneNumber,
  username,
  formID
) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some(
    (collection) => collection.name === reserveCollection
  );
  const totalForm = await collection.find({}).toArray();
  const formId = `${nim}0${totalForm.length + 1}`;

  if (!collectionExists) {
    await db.createCollection(reserveCollection);
  }

  if (formID == undefined) {
    const dataToInsert = [
      {
        _id: formId,
        uniquecode: null,
        purgable: true,
        status: "incomplete",
        review: "pending",
        datecreated: null,
        datesolved: "-",
        fullname: fullname,
        username: username,
        email: email,
        major: major,
        phonenumber: phoneNumber,
        category: null,
        problems: null,
        details: null,
        meetType: null,
        timePref: null,
        activeDay: null,
        partname: null,
        partprice: null,
        servicefee: null,
        ispaid: false,
      },
    ];
    const result = await collection.insertMany(dataToInsert);
  } else {
    const filter = { _id: formID };
    const updateDocument = {
      $set: {
        fullname: fullname,
        username: username,
        email: email,
        major: major,
        phonenumber: phoneNumber,
      },
    };
    const dataToInsert = await collection.updateOne(filter, updateDocument);
  }
  return true;
}

async function services(category, problem, details, username) {
  await client.connect();
  const catSplit = category.split(" ");
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const account = db.collection(accountCollection);
  const pricelist = db.collection(priceCollection);
  const getAccount = await account
    .find({ username: username, active: true })
    .toArray();
  const totalForm = await collection.find({}).toArray();
  var getItem;

  if (category != "Web/App Creation") {
    const getPrice = await pricelist.find({ type: category.trim() }).toArray();
    getItem = getPrice[Math.floor(Math.random() * getPrice.length)];
  } else {
    const getPrice = await pricelist
      .find({ type: category.trim(), name: problem.split(" ")[0] })
      .toArray();
    getItem = getPrice[0];
  }

  const getIncomplete = await collection
    .find({ username: username.trim(), status: "incomplete" })
    .toArray();
  const filter = { _id: getIncomplete[getIncomplete.length - 1]._id };
  const uniqueCode = `${getAccount[0]._id}${catSplit[0][0]}${catSplit[1][0]}${problem[0]}00${totalForm.length}`;
  const updateDocument = {
    $set: {
      category: category,
      problems: problem,
      details: details,
      uniquecode: uniqueCode,
      purgable: false,
      partname: getItem.name,
      partprice: getItem.price,
      servicefee: "10000",
    },
  };
  const dataToInsert = await collection.updateOne(filter, updateDocument);
  return true;
}

async function appoint(activeDay, meetType, timePref, username) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const getIncomplete = await collection
    .find({ username: username.trim(), status: "incomplete" })
    .toArray();
  const filter = { _id: getIncomplete[getIncomplete.length - 1]._id };
  const currentTime = Date.now();
  const currentDate = new Date(currentTime);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const DATE = `${day}/${month}/${year}`;

  const updateDocument = {
    $set: {
      meetType: meetType,
      timePref: timePref,
      activeDay: activeDay,
      status: "complete",
      datecreated: DATE,
    },
  };
  const dataToInsert = await collection.updateOne(filter, updateDocument);
  return true;
}

async function getUserData(username) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(accountCollection);
  const currentUser = await session.find({ username: username }).toArray();
  const dataCollect = [];
  if (currentUser.length != 0) {
    dataCollect.push(
      currentUser[0].fullName,
      currentUser[0].email,
      currentUser[0]._id
    );
    return dataCollect;
  } else {
    return false;
  }
}

async function insertReviewForm(username, message) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const currentTime = Date.now();
  const currentDate = new Date(currentTime);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const DATE = `${day}/${month}/${year}`;
  const filter = { username: username.trim(), review: "incomplete" };
  const updateDocument = {
    $set: { message: message, review: "complete", reviewdate: DATE },
  };
  const dataToInsert = await session.updateOne(filter, updateDocument);
  return true;
}

async function getUserForm(username) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const userForm = await session
    .find({ username: username, purgable: false, status: "complete" })
    .toArray();
  if (userForm.length != 0) {
    return userForm;
  } else {
    return false;
  }
}

async function getRecentForm(username) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const userForm = await session
    .find({
      username: username,
      purgable: false,
      status: "incomplete",
    })
    .toArray();
  if (userForm.length != 0) {
    return userForm;
  } else {
    return false;
  }
}

async function vaCheckout(username, reserveId, bank, vaNumber, totalPrice) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const currentForm = await session
    .find({ _id: reserveId.trim(), username: username, ispaid: false })
    .toArray();
  const totalForm = await session.find({ ispaid: true }).toArray();
  const currentTime = Date.now();
  const currentDate = new Date(currentTime);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const DATE = `${day}/${month}/${year}`;
  const paymentId = `014${day}${month}${year}00${totalForm.length + 1}`;
  if (currentForm.length != 0) {
    const filter = { _id: reserveId.trim(), username: username };
    const updateDocument = {
      $set: {
        ispaid: true,
        datesolved: DATE,
        paymentId: paymentId,
        bankname: bank,
        vanumber: vaNumber,
        totalprice: totalPrice,
      },
    };
    const dataToInsert = await session.updateOne(filter, updateDocument);
    return true;
  } else {
    return false;
  }
}

async function ewCheckout(
  username,
  reserveId,
  eWallet,
  eWalletNumber,
  totalPrice
) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(reserveCollection);
  const currentForm = await session
    .find({ _id: reserveId.trim(), username: username, ispaid: false })
    .toArray();
  const totalForm = await session.find({ ispaid: true }).toArray();
  const currentTime = Date.now();
  const currentDate = new Date(currentTime);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const DATE = `${day}/${month}/${year}`;
  const paymentId = `014${day}${month}${year}00${totalForm.length + 1}`;
  if (currentForm.length != 0) {
    const filter = { _id: reserveId.trim(), username: username };
    const updateDocument = {
      $set: {
        ispaid: true,
        datesolved: DATE,
        paymentId: paymentId,
        ewalletname: eWallet,
        ewalletnumber: eWalletNumber,
        totalprice: totalPrice,
      },
    };
    const dataToInsert = await session.updateOne(filter, updateDocument);
    return true;
  } else {
    return false;
  }
}

async function signIn(userCred, userPassword) {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(accountCollection);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(userCred)) {
    const currentUser = await session.find({ email: userCred }).toArray();
    const filter = { email: userCred };

    const updateDocument = {
      $set: { active: true },
    };

    if (currentUser.length != 0) {
      if (userPassword == currentUser[0].password) {
        const result = await session.updateOne(filter, updateDocument);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    const currentUser = await session.find({ username: userCred }).toArray();
    const filter = { username: userCred };

    const updateDocument = {
      $set: { active: true },
    };

    if (currentUser.length != 0) {
      if (userPassword == currentUser[0].password) {
        const result = await session.updateOne(filter, updateDocument);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

async function logOut() {
  await client.connect();
  const db = client.db(databaseName);
  const session = db.collection(accountCollection);
  const currentUser = await session.find({ active: true }).toArray();
  if (currentUser.length != 0) {
    const filter = { _id: currentUser[0]._id };

    const updateDocument = {
      $set: { active: false },
    };
    const result = await session.updateOne(filter, updateDocument);
    return true;
  } else {
    return false;
  }
}
// Panggil fungsi koneksi

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Ganti dengan URL aplikasi klien Anda
    methods: "GET,POST", // Atur metode yang diizinkan
    allowedHeaders: ["Content-Type"],
    mode: "cors",
  })
);

app.post("/signup", async (req, res) => {
  const { fullName, userName, email, nim, password } = req.body;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(email)) {
    const insert = await insertSignUp(fullName, userName, email, nim, password);
    res.json(insert);
  } else {
    res.send(false);
  }
});

app.post("/signin", async (req, res) => {
  const { userCred, userPassword } = req.body;
  const insert = await signIn(userCred, userPassword);
  res.send(insert);
});

app.post("/editprofile", async (req, res) => {
  const { username, phone, email, customerID } = req.body;
  const editProfile = await editUserProfile(username, phone, email, customerID);
  res.send(editProfile);
});

app.post("/session", async (req, res) => {
  const { request, userName } = req.body;
  let reqData = await activeUser();
  res.json(reqData);
});

app.post("/getreserve", async (req, res) => {
  const { userName } = req.body;
  let reqData = await fetchActiveReserve(userName);

  if (reqData == false) {
    res.send(reqData);
  } else {
    res.json(reqData);
  }
});

app.post("/initdata", async (req, res) => {
  const { request } = req.body;
  let initData = await initializeData();
  res.send(initData);
});

app.post("/getprice", async (req, res) => {
  const { username, reserveId } = req.body;
  let getData = await getPriceBil(username, reserveId);
  res.json(getData);
});

app.post("/getuser", async (req, res) => {
  const { username } = req.body;
  let reqData = await activeUser1();
  res.json(reqData);
});

app.post("/purge", async (req, res) => {
  const { request, username } = req.body;
  if (request == "purge") {
    let purgeData = await removeIncompleteForm(username);
    res.send(purgeData);
  } else if (request == "cancel") {
    let preventPurge = await cancelPurgeForm(username);
    res.send(preventPurge);
  }
});

app.post("/purgereview", async (req, res) => {
  const { userName } = req.body;
  const purgeReview = await removeIncompleteReview(userName);
  res.send(purgeReview);
});

app.post("/reserve", async (req, res) => {
  const { fullname, email, major, phoneNumber, nim, username, formId } =
    req.body;

  if (formId == "") {
    var validPhoneNumber;
    if (phoneNumber[0] != "0") {
      validPhoneNumber = `+62${phoneNumber}`;
    } else {
      validPhoneNumber = phoneNumber.slice(1);
      validPhoneNumber = `+62${validPhoneNumber}`;
    }

    let inputReserve = await reservation(
      nim,
      fullname,
      email,
      major,
      validPhoneNumber,
      username
    );
    res.send(inputReserve);
  } else {
    let inputReserve = await reservation(
      nim,
      fullname,
      email,
      major,
      phoneNumber,
      username,
      formId
    );
    res.send(inputReserve);
  }
});

app.post("/services", async (req, res) => {
  const { category, problem, details, username } = req.body;
  let inputServices = await services(category, problem, details, username);
  res.send(inputServices);
});

app.post("/appoint", async (req, res) => {
  const { activeDay, meetType, timePref, username } = req.body;
  let inputServices = await appoint(activeDay, meetType, timePref, username);
  res.send(inputServices);
});

app.post("/getuserdata", async (req, res) => {
  const { username } = req.body;
  let reqData = await getUserData(username);
  res.json(reqData);
});

app.post("/getform", async (req, res) => {
  const { username } = req.body;
  let reqData = await getUserForm(username);
  res.json(reqData);
});

app.post("/getstat", async (req, res) => {
  const { userName } = req.body;
  let reqData = await getUserStat(userName);
  res.json(reqData);
});

app.post("/recentform", async (req, res) => {
  const { username } = req.body;
  let reqData = await getRecentForm(username);
  res.json(reqData);
});

app.post("/checkreserve", async (req, res) => {
  const { reserveId, username } = req.body;
  let checkData = await checkReserve(reserveId, username);
  res.json(checkData);
});

app.post("/paymenthistory", async (req, res) => {
  const { getUsername } = req.body;

  let checkData = await getPaymentHistory(getUsername);
  res.json(checkData);
});

app.post("/checkunique", async (req, res) => {
  const { uniqueCode, username } = req.body;
  let checkData = await checkUnique(uniqueCode, username);
  res.send(checkData);
});

app.post("/review", async (req, res) => {
  const { username, category, message } = req.body;
  let insertReview = await insertReviewForm(username, message);
  res.send(insertReview);
});

app.post("/getallreview", async (req, res) => {
  const { request } = req.body;
  let fetchReview = await fetchAllReview();
  res.json(fetchReview);
});

app.post("/getreview", async (req, res) => {
  const { getUsername, request } = req.body;
  let getReviewUser = await retrieveUserReview(getUsername, request);
  res.json(getReviewUser);
});

app.post("/getprofile", async (req, res) => {
  const { username } = req.body;
  let getProfile = await retrieveUserProfile(username);
  res.json(getProfile);
});

app.post("/vacheckout", async (req, res) => {
  const { username, reserveId, bank, vaNumber, totalPrice } = req.body;
  let checkData = await vaCheckout(
    username,
    reserveId,
    bank,
    vaNumber,
    totalPrice
  );
  res.send(checkData);
});

app.post("/ewcheckout", async (req, res) => {
  const { username, reserveId, eWallet, eWalletNumber, totalPrice } = req.body;
  let checkData = await ewCheckout(
    username,
    reserveId,
    eWallet,
    eWalletNumber,
    totalPrice
  );
  res.send(checkData);
});

app.post("/signout", async (req, res) => {
  const { request } = req.body;
  let logout = await logOut();
  res.send(logout);
});

// app.post("/data", async (req, res) => {
//   const data = req.body;

//   const client = new OAuth2Client();
//   async function verify() {
//     const ticket = await client.verifyIdToken({
//       idToken: data.idToken,
//       audience: "43375088554-nsvi4j6fuv7l0tpfngmj3ggshgbmbmc6.apps.googleusercontent.com",
//     });
//     const payload = ticket.getPayload();
//     const userid = payload["sub"];
//     const domain = payload["paramadina.ac.id"];
//     MongoDBTask("write", "google", payload.email, payload.name);
//     res.json(payload.email);
//   }
//   verify().catch(console.error);
// });

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`);
});

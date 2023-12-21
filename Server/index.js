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
const port = 3001;

// Buat instance MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertSignUp(fullName, userName, email, nim, password) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(accountCollection);
  // const databasesList = await client.db().admin().listDatabases();
  // const databaseExists = databasesList.databases.some((db) => db.name === databaseName);
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some((collection) => collection.name === accountCollection);

  if (!collectionExists) {
    await db.createCollection(accountCollection);
  }

  const idCheck = await collection.find({ _id: nim }).toArray();
  const unameCheck = await collection.find({ username: userName }).toArray();
  const emailCheck = await collection.find({ email: email }).toArray();
  if (idCheck.length == 0 && emailCheck == 0 && unameCheck == 0) {
    const dataToInsert = [{ _id: nim, fullName: fullName, username: userName, email: email, password: password, active: true }];
    const result = await collection.insertMany(dataToInsert);
    return true;
  } else if (idCheck.length != 0) {
    return "nim-exist";
  } else {
    return "data-exist";
  }
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

async function removeIncompleteForm(username) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const deleteIncomplete = await collection.deleteMany({ username: username, status: "incomplete" });
  return true;
}

async function reservation(nim, fullname, email, major, phoneNumber, username) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some((collection) => collection.name === reserveCollection);
  const totalForm = await collection.find({}).toArray();
  const formId = `${nim}0${totalForm.length + 1}`;

  if (!collectionExists) {
    await db.createCollection(reserveCollection);
  }

  const dataToInsert = [{ _id: formId, status: "incomplete", fullname: fullname, username: username, email: email, major: major, phonenumber: phoneNumber, category: null, problems: null, details: null, meetType: null, timePref: null, activeDay: null }];
  const result = await collection.insertMany(dataToInsert);
  return true;
}

async function services(category, problem, details, username) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const getIncomplete = await collection.find({ username: username.trim(), status: "incomplete" }).toArray();
  const filter = { _id: getIncomplete[getIncomplete.length - 1]._id };

  const updateDocument = {
    $set: { category: category, problems: problem, details: details },
  };
  const dataToInsert = await collection.updateOne(filter, updateDocument);
  return true;
}

async function appoint(activeDay, meetType, timePref, username) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const getIncomplete = await collection.find({ username: username.trim(), status: "incomplete" }).toArray();
  const filter = { _id: getIncomplete[getIncomplete.length - 1]._id };

  const updateDocument = {
    $set: { meetType: meetType, timePref: timePref, activeDay: activeDay, status: "complete" },
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
    dataCollect.push(currentUser[0].fullName, currentUser[0].email, currentUser[0]._id);
    return dataCollect;
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

app.post("/session", async (req, res) => {
  const { request, userName } = req.body;
  if (userName !== undefined) {
    console.log("Masuk tidak undefined");
    let reqData = await activeUser();
    if (request == "reserve") {
      let purgeIncomplete = await removeIncompleteForm(userName);
    }
    res.json(reqData);
  } else {
    return false;
  }

});


app.post("/reserve", async (req, res) => {
  const { fullname, email, major, phoneNumber, nim, username } = req.body;
  let inputReserve = await reservation(nim, fullname, email, major, phoneNumber, username);
  res.json(inputReserve);
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

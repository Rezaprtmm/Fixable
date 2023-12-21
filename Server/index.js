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
    return currentUser[currentUser.length - 1].username;
  } else {
    return false;
  }
}

async function reservation(nim, fullname, email, major, phoneNumber) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some((collection) => collection.name === reserveCollection);
  const totalForm = await collection.find({}).toArray();
  const formId = `${nim}${totalForm.length + 1}`;

  if (!collectionExists) {
    await db.createCollection(reserveCollection);
  }

  const dataToInsert = [{ _id: formId, status: "incomplete", fullname: fullname, email: email, major: major, phonenumber: phoneNumber }];
  const result = await collection.insertMany(dataToInsert);
  return true;
}

async function services(category, problem, details) {
  await client.connect();
  const db = client.db(databaseName);
  const collection = db.collection(reserveCollection);
  const getIncomplete = await collection.find({ status: "incomplete" }).toArray();
  const filter = { _id: getIncomplete[getIncomplete.length - 1]._id };

  const updateDocument = {
    $set: { category: category, problems: problem, details: details },
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
    dataCollect.push(currentUser[currentUser.length - 1].fullName, currentUser[currentUser.length - 1].email, currentUser[currentUser.length - 1]._id);
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
      if (userPassword == currentUser[currentUser.length - 1].password) {
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
      if (userPassword == currentUser[currentUser.length - 1].password) {
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

async function MongoDBTask(task, type, email, name, uname, passwd) {
  await client.connect();
  if (task == "read" && type == "User-Data") {
    const db = client.db(databaseName);
    const sessionCollection = db.collection(accountSession);
    const currentUser = await sessionCollection.find().toArray();
    if (currentUser.length == 0) {
      return true;
    } else {
      return currentUser[currentUser.length - 1].uname;
    }
  } else if (task == "read" && type == "User-Logout") {
    const db = client.db(databaseName);
    const collection = db.collection(accountSession);
    const deleteSession = await collection.deleteMany({});
    return true;
  } else if (task == "write") {
    const db = client.db(databaseName);
    const collection = db.collection(accountCollection);
    const sessions = db.collection(accountSession);
    const databasesList = await client.db().admin().listDatabases();
    const databaseExists = databasesList.databases.some((db) => db.name === databaseName);
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some((collection) => collection.name === accountCollection);
    const sessionExists = collections.some((collection) => collection.name === accountSession);

    if (databaseExists) {
      console.log(`Database '${databaseName}' sudah ada.`);
    } else {
      console.log(`Database '${databaseName}' belum ada. Membuat database baru...`);
      console.log(`Database '${databaseName}' berhasil dibuat.`);
    }
    if (collectionExists) {
      console.log(`Koleksi '${accountCollection}' sudah ada dalam basis data '${databaseName}'.`);
    } else {
      console.log(`Koleksi '${accountCollection}' belum ada dalam basis data '${databaseName}'. Membuat koleksi baru...`);
      await db.createCollection(accountCollection);
      console.log(`Koleksi '${accountCollection}' berhasil dibuat.`);
    }
    if (sessionExists) {
      console.log(`Koleksi '${accountSession}' sudah ada dalam basis data '${databaseName}'.`);
    } else {
      console.log(`Koleksi '${accountSession}' belum ada dalam basis data '${databaseName}'. Membuat koleksi baru...`);
      await db.createCollection(accountSession);
      console.log(`Koleksi '${accountSession}' berhasil dibuat.`);
    }

    if (type == "google") {
      const dataToInsert = [{ nama: name, email: email, uname: name }];
      const data = await collection.find({ email: email }).toArray();
      if (data.length == 0) {
        const result = await collection.insertMany(dataToInsert);
        const setSession = await sessions.insertMany(dataToInsert);
        console.log(`${result.insertedCount} dokumen berhasil dimasukkan ke dalam koleksi '${accountCollection}'.`);
        console.log(`${setSession.insertedCount} dokumen berhasil dimasukkan ke dalam koleksi '${accountSession}'.`);
      } else {
        const setSession = await sessions.insertMany(dataToInsert);
        console.log(`${setSession.insertedCount} dokumen berhasil dimasukkan ke dalam koleksi '${accountSession}'.`);
      }
    } else if (type == "manualInput") {
      if (email != "") {
        const data = await collection.find({ email: email }).toArray();
        if (data.length == 0) {
          const currentUser = await collection.find({}).toArray();
          uname = `User${currentUser.length + 1}`;
          const dataToInsert = [{ email: email, uname: uname, passwd: passwd }];
          const sessionInsert = [{ email: email, uname: uname }];

          const result = await collection.insertMany(dataToInsert);
          const setSession = await sessions.insertMany(sessionInsert);
          console.log(`${result.insertedCount} dokumen berhasil dimasukkan ke dalam koleksi '${accountCollection}'.`);
          console.log(`${setSession.insertedCount} dokumen berhasil dimasukkan ke dalam koleksi '${accountSession}'.`);
          return true;
        } else {
          if (passwd != data[0].passwd) {
            console.log(passwd);
            console.log("Masuk salah");
            return false;
          } else {
            const sessionInsert = [{ email: email, uname: data[0].uname }];

            console.log(passwd);
            console.log("Masuk benar");
            const setSession = await sessions.insertMany(sessionInsert);
            console.log(`${setSession.insertedCount} dokumen berhasil dimasukkan ke dalam koleksi '${accountSession}'.`);
            return true;
          }
        }
      } else if (uname != "") {
        const data = await collection.find({ uname: uname }).toArray();
        if (data.length == 0) {
          const dataToInsert = [{ email: email, uname: uname, passwd: passwd }];
          const sessionInsert = [{ email: email, uname: uname }];

          const result = await collection.insertMany(dataToInsert);
          const setSession = await sessions.insertMany(sessionInsert);
          console.log(`${result.insertedCount} dokumen berhasil dimasukkan ke dalam koleksi '${accountCollection}'.`);
          console.log(`${setSession.insertedCount} dokumen berhasil dimasukkan ke dalam koleksi '${accountSession}'.`);
          return true;
        } else {
          if (passwd != data[0].passwd) {
            console.log(passwd);
            console.log("Masuk salah");
            return false;
          } else {
            const sessionInsert = [{ email: email, uname: uname }];

            console.log(passwd);
            console.log("Masuk benar");
            const setSession = await sessions.insertMany(sessionInsert);
            console.log(`${setSession.insertedCount} dokumen berhasil dimasukkan ke dalam koleksi '${accountSession}'.`);
            return true;
          }
        }
      }
    }
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
  const { request } = req.body;
  if (request == "reserve") {
    console.log("Masuk");
  }
  let reqData = await activeUser();
  res.json(reqData);
});

app.post("/reserve", async (req, res) => {
  const { fullname, email, major, phoneNumber, nim } = req.body;
  let inputReserve = await reservation(nim, fullname, email, major, phoneNumber);
  res.send(inputReserve);
});

app.post("/services", async (req, res) => {
  const { category, problem, details } = req.body;
  let inputServices = await services(category, problem, details);
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

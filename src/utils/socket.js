const functions = require("firebase-functions");
const admin = require("firebase-admin");
const io = require("socket.io")();

admin.initializeApp();

io.on("connection", (client) => {
  console.log("a user connected");

  client.on("disconnect", () => {
    console.log("user disconnected");
  });
});

exports.chat = functions.https.onRequest(io);

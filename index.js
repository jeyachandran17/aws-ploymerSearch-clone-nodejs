// const express = require("express"); // "type": "commonjs"
import express from "express";
import { MongoClient } from "mongodb"; // "type": "module"
const app = express();

const PORT = 4000;

const MONGO_URL = "mongodb://127.0.0.1";
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");


app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏Capstone project nodejs🎊✨🤩");
});

app.get("/all-details",async function (request, response) {
  const result = await client.db("b42wd2").collection("capstone").find({}).toArray();
  response.send(result);
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
// const express = require("express"); // "type": "commonjs"
import express from "express";
import { MongoClient } from "mongodb"; // "type": "module"
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏Capstone project nodejs🎊✨🤩");
});

app.get("/all-details",async function (request, response) {
  const result = await client.db("b42wd2").collection("capstone").find({}).toArray();
  response.send(result);
})

app.post('/all-details', async function (request, response) {
  const details = request.body;
  const AllDedails = await client.db("b42wd2").collection("capstone").insertMany(details);
  response.send(AllDedails);
})


// GET "all-license_name"

app.get('/all-license-name', async function (request, response) {
  const license_name = await client.db("b42wd2").collection("capstone").find({},{ projection: { _id: 0,license_name: 1, } }).toArray();
  response.send(license_name);
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

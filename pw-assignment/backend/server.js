import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { polls_router } from "./routers/polls.js";
import { user_router } from "./routers/users.js";

const url = "mongodb://127.0.0.1:27017/pw-assignment";

async function main() {
  await mongoose.connect(url);
}

main().catch((err) => console.log(err));

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8001;

app.get("/", (_, res) => {
  res.send("Hello World, from Dikshant Rajput");
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);

app.use('/poll',polls_router);
app.use('/user',user_router);

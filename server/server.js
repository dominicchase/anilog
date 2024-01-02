require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.once("open", () => console.log("Connected to Database"));
db.on("error", (error) => console.error(error));

app.use(express.json());

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const backlogRouter = require("./routes/backlog");
app.use("/backlog", backlogRouter);

app.listen(3001, () => console.log("Server started"));

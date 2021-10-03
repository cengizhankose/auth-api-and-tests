const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const port = 3000;

//setup to read an env var from a file
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connect to DB");
});

//Middleware
app.use(express.json());

//Route Middleware
app.use("/api/user", authRoute);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

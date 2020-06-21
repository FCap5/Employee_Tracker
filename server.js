const mysql = require("mysql");
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const connection = require("./config/connection.js");
const program = require("./config/inquirer.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});

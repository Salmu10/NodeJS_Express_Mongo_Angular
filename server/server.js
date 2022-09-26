const express = require("express");
const cors = require("cors");
const connect_db = require("./app/config/db.config.js");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

var corsOptions = {
  origin: process.env.CORSURL || "http://localhost:4200"
};

const PORT = process.env.PORT || 8080;

connect_db();

app.use(cors(corsOptions));

app.use(express.json());

app.use(require("./app/routes/index"));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
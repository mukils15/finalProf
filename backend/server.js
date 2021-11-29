const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

const AuthRoutes = require("./routes/authRoutes.js");
app.use("/", AuthRoutes);

app.listen(PORT, () => {
    console.log("Started");
})
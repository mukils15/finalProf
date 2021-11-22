const express = require("express");
const request = require("request");
const mongoose = require('mongoose');

const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");

const spotifytRouter = require('./routes/spotify')
const userRouter = require('./routes/user')

require('dotenv').config();

var app = express();
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(cookieParser());


app.use('/spotify', spotifyRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT || 3000, function() {
    console.log("Running on port 3000");
})


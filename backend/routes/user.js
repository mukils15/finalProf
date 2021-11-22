const express = require('express');
const router = express.Router();
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

var generateRandomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = "spotify_auth_state";

router.get("/login", function (req, res) {
    var state = generateRandomString(16);

    res.cookie(stateKey, state);

    var scope = "user-read-private user-read-email user-top-read";
    console.log(state);
    res.redirect(
        "https:/accounts.spotify.com/authorize?" + 
        querystring.stringify({
            response_type: "code",
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_url,
            state: state
        })
    );
});
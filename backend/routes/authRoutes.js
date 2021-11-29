const express = require("express");
const router = express.Router();
import axios from "axios";
const querystring = require("querystring");


router.get("/login", async (req, res) => {
    let scope = "user-modify-playback-state user-read-playback-state user-read-currently-playing";
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_url=${process.env.REDIRECTURI}&scope=${scope}&show_dialog=true`);
})

const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

router.get("/logged", async (req, res) => {
    let body = {
        grant_type = "authorization_code",
        code: req.query.code,
        redirect_uri: process.env.REDIRECTURI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
    }

    await axios.post("https://accounts.spotify.com/api/token", encodeFormData(body), {
        headers: headers
    }).then(resp => resp.json())
    .then(data => {
        let query = querystring.stringify(data);
        res.redirect(`http://localhost:3000/${query}`);
    });
})
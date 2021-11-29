const express = require("express");
const router = express.Router();
import axios from "axios";
const querystring = require("querystring");

router.get("/getUser/:token", async (req, res) => {
  await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(response => response.json())
  .then(data => {
    userID = data.id;
    res.json(data);
  })
})

router.get("/playlists/:token", async(req, res) => {
  axios.get(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.json())
  .then(data => res.json(data));
})

router.post("/search/:token", async(req, res) => {
  let unchangedBody = req.query.message.split(" ");
  let changed = unchangedBody.join("%20");
  axios.post(`https://api.spotify.com/v1/search?q=${changed}&type=artist,track`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.json())
  .then(data => res.json(data));
})

const express = require("express");
const router = express.Router();
const axios = require('axios');
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
  let playlist_names = [];
  axios.get(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.data.items)
  .then(data => {
    data.forEach(element => {
      playlist_names.push(element['name']);
    });
  }).then(() => res.send(playlist_names));
})


router.get("/artists/short/:token", async(req, res) => {
  let artist_names = [];
  axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=13&offset=0`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.data.items)
  .then(data => {
    data.forEach(element => {
      let obj = {}
      obj['name'] = element['name'];
      obj['popularity'] =element['popularity']
      obj['url'] = element['images'][0]['url']
      artist_names.push(obj);
    });
  }).then(() => res.send(artist_names));
})

router.get("/artists/medium/:token", async(req, res) => {
  let artist_names = [];
  axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=13&offset=0`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.data.items)
  .then(data => {
    data.forEach(element => {
      let obj = {}
      obj['name'] = element['name'];
      obj['popularity'] =element['popularity']
      obj['url'] = element['images'][0]['url']
      artist_names.push(obj);
    });
  }).then(() => res.send(artist_names));
})

router.get("/artists/long/:token", async(req, res) => {
  let artist_names = [];
  axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=13&offset=0`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.data.items)
  .then(data => {
    data.forEach(element => {
      let obj = {}
      obj['name'] = element['name'];
      obj['popularity'] =element['popularity']
      obj['url'] = element['images'][0]['url']
      artist_names.push(obj);
    });
  }).then(() => res.send(artist_names));
})

router.get("/userName/:token", async(req, res) => {
  axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.data.display_name).then(data => res.send(data));
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

module.exports = router
const express = require("express");
const router = express.Router();
const axios = require('axios');
const querystring = require("querystring");
const Team = require('../models/team')

router.post("/addTeam", async(req, res) => {
    const teamNew = new Team({
        starting_pg: JSON.parse(req.query.artists[0])['popularity'],
        starting_sg: JSON.parse(req.query.artists[1])['popularity'],
        starting_sf: JSON.parse(req.query.artists[2])['popularity'],
        starting_pf: JSON.parse(req.query.artists[3])['popularity'],
        starting_c: JSON.parse(req.query.artists[4])['popularity'],
        bench1: JSON.parse(req.query.artists[5])['popularity'],
        bench2: JSON.parse(req.query.artists[6])['popularity'],
        bench3: JSON.parse(req.query.artists[7])['popularity'],
        bench4: JSON.parse(req.query.artists[8])['popularity'],
        bench5: JSON.parse(req.query.artists[9])['popularity'],
        bench6: JSON.parse(req.query.artists[10])['popularity'],
        bench7: JSON.parse(req.query.artists[11])['popularity'],
        bench8: JSON.parse(req.query.artists[12])['popularity'],
        team_name: req.query.team,
        user: req.query.user
    });

    teamNew.save(function (err) {
        if (err){
            console.log(err);
        } else {
            console.log("wefwef");
            res.send("Added user!")
        }
    });
    
})


module.exports = router
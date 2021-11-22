const express = require('express');
const router = express.Router();
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

app.get("/callback", function(req, res) {
    console.log(req.query);
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState){
        res.redirect(
            "/#" + 
            querystring.stringify({
                error: "state_mismatch"
            })
        );
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
              code: code,
              redirect_uri: redirect_url,
              grant_type: "authorization_code",
            },
            headers: {
              Authorization:
                "Basic " +
                new Buffer(client_id + ":" + client_secret).toString("base64"),
            },
            json: true,
          };

          request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              access_token = body.access_token;
              var access_token = body.access_token,
                refresh_token = body.refresh_token;
      
              res.redirect(
                "/#" +
                  querystring.stringify({
                    client: "spotify",
                    access_token: access_token,
                    refresh_token: refresh_token,
                  })
              );
            } else {
              res.send("There was an error during authentication.");
            }
          });
    }

});
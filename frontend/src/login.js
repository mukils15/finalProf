import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SpotifyAuth } from "react-spotify-auth"
import "react-spotify-auth/dist/index.css"
import { Scopes } from 'react-spotify-auth';

const Login = () => {
    const [logintok, setTok] = useState(null);
    const spotify_redirect = async () => {
        const rest = await axios.get('./backend/routes/authRoutes/login');
        /*
        if (rest.request._redirectable._redirectCount != 0){
            alert("made it");
        } else {
            alert("Cant redirect!");
        } */
    } 

    const onAccessToken = (token) => {
        console.log("wefrjwefwefwef")
    }

    return (
         <div className="container">
            <h1> Log In </h1>
            <p> Click here to login with Spotify!</p>
            <SpotifyAuth
                redirectUri = "http://localhost:3000/logged"
                clientID="ac96f36b33c744c2a7e9f26f2b59cdf6"
                scopes={[Scopes.userReadCurrentlyPlaying, Scopes.userTopRead]}
                onAccessToken ={console.log("wewe")}
            />
            <br></br>
        </div>
    )
}

export default Login;
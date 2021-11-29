import React from "react";
import axios from 'axios';


const login = () => {
    /*
    const spotify_redirect = async () => {
        const rest = await axios.get('./backend/routes/user/login');
        if (rest.request._redirectable._redirectCount != 0){
            const red = await axios.get('./backend/routes/spotify/callback');
        } else {
            alert("Cant redirect!");
        }
    } */

    return (
         <div className="container">
            <h1> Log In </h1>
            <p> Click here to login with Spotify!</p>
            <div className = "clearfix">
                <Button variant="success" className="btn btn-success w-50" onClick={spotify_redirect}>Log-in</Button>
            </div>
            <br></br>
            Don't have an account?
            <Link to="/signup">Sign-up here</Link>
        </div>
    )
}

export default login;
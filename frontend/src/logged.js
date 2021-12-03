import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { SpotifyAuthListener } from "react-spotify-auth"
import "react-spotify-auth/dist/index.css"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './logged.css'
import { teams } from './teams.json'
import { ratings } from './teams.json'

const Logged = () => {

    const [playl, setPlay] = useState(null);
    const [tok, setToke] = useState(null);
    const [frame, setFr] = useState(null);
    const [starters, setStart] = useState(null);
    const [bench, setBench] = useState(null);
    const [simTeam, setTeam] = useState("Choose a time frame to see a similar team");


    const euclidDist = (arr1, arr2) => {
        let tot = 0;
        for (let m = 0; m < arr1.length; m++){
            let diff = arr1[m] - arr2[m];
            diff = diff*diff;
            tot = tot + diff;
        }
        return tot;
    }

    const normalize = (arr1) => {
        let tot = 0;
        for (let m = 0; m < arr1.length; m++){
            tot = tot + arr1[m];
        }
        var new_array = arr1.map(rat => { 
            return (rat/tot);
        });
        return new_array;
    }

    const printToken = async (token) => {
        setToke(token);
    }

    const short = async (token) => {
        const play = await axios.get(`/spotify/artists/short/${tok}`);
        let artists = assnPos(play.data);
        let starter_rat = [];
        setStart(artists.slice(0, 5)); 
        let total = 0;
        (artists.slice(0, 5)).map(artist => {
            total = total + artist['popularity']
            starter_rat.push(artist['popularity'])
        })

        var new_array = starter_rat.map(rat => { 
            return (rat/total);
        });

        let min_dist = 1000000000;
        let team_name = "";
        for (let n = 0; n < teams.length; n++){
            let team1_rat = ratings[n];
            team2_rat = normalize(team1_rat);
            let dist = euclidDist(new_array, team2_rat);
            if (dist < min_dist){
                min_dist = dist;
                team_name = teams[n];
                setTeam(team_name);
            }
        }
        setBench(artists.slice(5)); 
        setPlay(artists);
        setFr("short");
    }

    const medium = async (token) => {
        const play = await axios.get(`/spotify/artists/medium/${tok}`);
        let artists = assnPos(play.data);
        let starter_rat = [];
        setStart(artists.slice(0, 5)); 
        let total = 0;
        (artists.slice(0, 5)).map(artist => {
            total = total + artist['popularity']
            starter_rat.push(artist['popularity'])
        })

        var new_array = starter_rat.map(rat => { 
            return (rat/total);
        });

        let min_dist = 1000000000;
        let team_name = "";
        for (let n = 0; n < teams.length; n++){
            let team1_rat = ratings[n];
            team2_rat = normalize(team1_rat);
            let dist = euclidDist(new_array, team2_rat);
            if (dist < min_dist){
                min_dist = dist;
                team_name = teams[n];
                setTeam(team_name);
            }
        }
        setStart(artists.slice(0, 5)); 
        setBench(artists.slice(5)); 
        setPlay(artists);
        setFr("medium");
    }

    const long = async () => {
        const play = await axios.get(`/spotify/artists/long/${tok}`);
        let artists = assnPos(play.data);
        let starter_rat = [];
        setStart(artists.slice(0, 5)); 
        let total = 0;
        (artists.slice(0, 5)).map(artist => {
            total = total + artist['popularity']
            starter_rat.push(artist['popularity'])
        })

        var new_array = starter_rat.map(rat => { 
            return (rat/total);
        });

        let min_dist = 1000000000;
        let team_name = "";
        for (let n = 0; n < teams.length; n++){
            let team1_rat = ratings[n];
            team2_rat = normalize(team1_rat);
            let dist = euclidDist(new_array, team2_rat);
            console.log(dist);
            if (dist < min_dist){
                console.log(teams[n]);
                min_dist = dist;
                team_name = teams[n];
                setTeam(team_name);
            }
        }
        setStart(artists.slice(0, 5)); 
        setBench(artists.slice(5)); 
        setPlay(artists);
        setFr("long");
    }

    const assnPos = (data) => {
        data[0]['position'] = "PG ";
        data[1]['position'] = "SG ";
        data[2]['position'] = "SF ";
        data[3]['position'] = "PF ";
        data[4]['position'] = "C ";
        for (let f = 5; f < data.length; f++){
            data[f]['position'] = "Bench "
        }
        return data;
    }

    const addTeam = async() => {
        const userN = await axios.get(`/spotify/userName/${tok}`);
        let username = userN["data"];
        const teamName = username + "'s" + " " + frame + " term team";
        const { data } = await axios.post('/discovery/addTeam', null, 
            { params : 
                {artists: playl, 
                team: teamName,
                user: username }});
        if ( data !== "Added user!"){
            alert("Couldn't add!")
        }
    }

    const chooseColor = (rating) => {

    }

    if (playl === null){
        return (
            <div>
                <SpotifyAuthListener
                    onAccessToken={printToken}
                />
                <div className="test">
                    <h1>
                        Welcome to Hoopify!
                    </h1>
                </div>
                <hr>
                </hr>
                <div className="mode">
                    <Button variant="success" className="btn btn-success w-30" onClick={short}>Last 4 Weeks</Button>
                    <Button variant="success" className="btn btn-success w-30" onClick={medium}>Last 6 Months</Button>
                    <Button variant="success" className="btn btn-success w-30" onClick={long}>All-time</Button>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <SpotifyAuthListener
                    onAccessToken={printToken}
                />
                <div className="test">
                    <h1>
                        Welcome to Hoopify!
                    </h1>
                </div>
                <hr>
                </hr>
                <div className="mode">
                    <Button variant="success" className="btn btn-success w-30" onClick={short}>Last 4 Weeks</Button>
                    <Button variant="success" className="btn btn-success w-30" onClick={medium}>Last 6 Months</Button>
                    <Button variant="success" className="btn btn-success w-30" onClick={long}>All-time</Button>
                </div>
                <hr>
                </hr>


                <div className="rowC">
                 {starters.map(artist => 
                    <div>
                        <div style={{backgroundColor: "#7C49C6", width: 170, height: 220}}> 
                            <div className="test" style={{backgroundColor: "#AD8DDB"}}><b>{artist['position']}</b></div>
                            <div className="test">
                                <img src={artist['url']} alt="Logo" width="150" height="150" />
                            </div>    
                            <div className="test" style={{backgroundColor: "#9469d2"}}>
                                <b>{artist['name']}</b>
                            </div>
                            <div className="test" style={{backgroundColor: "#9469d2"}}>
                                <b>{artist['popularity']}</b>
                            </div>
                        </div>
                     </div>)}
                </div>
                <br>
                </br>


                <div className="rowC">
                 {bench.map(artist => <div><div style={{backgroundColor: "#44A5D1", width: 170, height: 220}}> 
                        <div className="test" style={{backgroundColor: "#AED7E9"}}><b>{artist['position']}</b></div>
                    <div className="test">
                        <img src={artist['url']} alt="Logo" width="150" height="150" />
                    </div>    

                    <div className="test" style={{backgroundColor: "#6abadd"}}>
                        <b>{artist['name']}</b>
                    </div>
                    <div className="test" style={{backgroundColor: "#6abadd"}}>
                        <b>{artist['popularity']}</b>
                    </div>
                     </div></div>)}
                </div>

                <hr>
                </hr>
                <div className="test">
                    <b>Your team comparison is: {simTeam}</b>
                </div>
                <hr>
                </hr>
                <div className="test">
                    <Button variant="primary" className="btn btn-primary w-50" onClick={addTeam}>Add team to database!</Button>
                    <br>
                    </br>
                    <p>
                    Note that when you add your team to our database, others will not be able to see your favorite artists.
                    </p> Those with similarly popular teams will be able to see your username and add you as a friend on Spotify. 
                    <hr>
                    </hr>
                </div>
               
            </div>
            
        )
    }

}

export default Logged;
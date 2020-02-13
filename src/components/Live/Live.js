import React, {useState, useEffect} from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import {useParams} from 'react-router-dom';
import API from '../../api';

function Live() {

    let {slug} = useParams();
   

    const [infoStream, setInfoStream] = useState([]);
    const [infoGame, setInfoGame] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const result = await API.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`);

            let gameID = result.data.data.map(gameid => {
                return gameid.game_id;
            })

            const resultNomGame = await API.get(`https://api.twitch.tv/helix/games?id=${gameID}`);

            let nomJeu = resultNomGame.data.data.map(gameName => {
                return gameName.name;
            })

            setInfoGame(nomJeu);
            setInfoStream(result.data.data[0])
        }

        fetchData();

    }, [])

    return (
        <div className="containerDecale">
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
            <div className="contInfo">
                <div className="tireStream">{infoStream.title}</div>
                <div className="infoGame">Streamer : {infoStream.user_name}, &nbsp; Langue : {infoStream.language}</div>
                <div className="nomJeu">Jeu : {infoGame}</div>
            </div>
        </div>
    )
}

export default Live;

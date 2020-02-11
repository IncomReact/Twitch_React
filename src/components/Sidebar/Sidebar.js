import React, {useState, useEffect} from 'react';
import API from '../../api';

function Sidebar() {

    const [topStreams, setTopStreams] = useState([]);

    // console.log(topStreams)

    useEffect(() => {
        const fecthData = async () => {
            const result = await API.get("https://api.twitch.tv/helix/streams");

            let dataArray = result.data.data;
            console.log('dataArray ===>', dataArray);

            let gameIDs = dataArray.map(stream => {
                return stream.game_id;
            })

            let userIDs = dataArray.map(stream => {
                return stream.user_id;
            })

            // Création des urls personnalisées
            let baseUrlGames = "https://api.twitch.tv/helix/games?";
            let baseUrlUsers = "https://api.twitch.tv/helix/users?";

            let queryParamsGame = "";
            let queryParamsUsers = "";

            gameIDs.map(id => {
                return (queryParamsGame = queryParamsGame + `id=${id}&`)
            })

            userIDs.map(id => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
            })

            // url final
            let urlFinalGames = baseUrlGames + queryParamsGame; 
            let urlFinalUsers = baseUrlUsers + queryParamsUsers;

            // Appel
            let gamesNames = await API.get(urlFinalGames);
            let getUsers = await API.get(urlFinalUsers);

            let gamesNameArray = gamesNames.data.data;
            let arrayUsers = getUsers.data.data;
            console.log('gamesNameArray =>',gamesNameArray)

            // création du tableau final
            let finalArray = dataArray.map(stream => {
                stream.gameName = "";
                stream.truePic = "";
                stream.login = "";
            

            gamesNameArray.forEach(name => {
                arrayUsers.forEach(user => {
                    if(stream.user_id === user.id && stream.game_id === name.id) {
                        stream.gameName = name.name;
                        stream.truePic = user.profile_image_url;
                        stream.login = user.login;
                    }

                })
            })
            return stream;
        })
            setTopStreams(finalArray.slice(0, 6));

        }

        fecthData();

    }, [])

    return (
        <div className="sidebar">

            <h2 className="titreSidebar">Chaînes recommandées</h2>

            <ul className="listeStream">

                {topStreams.map((stream, index) => (
                    <li key={index} className="containerFlexSidebar">

                        <img src={stream.truePic} alt="logo user" className="profilePicRonde"/>

                        <div className="streamUser">{stream.user_name}</div>

                        <div className="viewerRight">

                            <div className="pointRouge"></div>
                            <div>{stream.viewer_count}</div>

                        </div>

                        <div className="gameNameSidebar">{stream.gameName}</div>
                    </li>  
                ))}

            </ul>
        </div>
    )

}

export default Sidebar
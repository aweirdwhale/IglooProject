import { useState, useEffect } from "react";

import _buttons from "../buttons.json";
import { useGamepads } from "react-gamepads";
import { Link, useNavigate } from "react-router-dom";

import goBack from "../../assets/igprj/gui/goback.png";
import header from "../../assets/igprj/gui/cmgamesheader.png";

import "./Play.css";

import _games from "./games.json"

const { shell } = require('electron');


function Play() {



    const [lastImageActive, setLastImageActive] = useState(false);

    const [logCount, setLogCount] = useState(79); // Ajout du compteur logCount
    const [gamepads, setGamepads] = useState([]);
    const [games, setGames] = useState(null)
    
    const [count, setCount] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        setGames(_games)
    }, [])


    useGamepads((_gamepads) => {
        setGamepads(Object.values(_gamepads));
      });

    useEffect(() => {
            if (gamepads[0]) {
                const leftStickX = gamepads[0].axes[0];
                const A = gamepads[0].buttons[_buttons.A].pressed;
                const B = gamepads[0].buttons[_buttons.B].pressed;
                const X = gamepads[0].buttons[_buttons.X].pressed;
                const Y = gamepads[0].buttons[_buttons.Y].pressed;
    
    
                if(leftStickX == 1) {
                    if (logCount === 0) { // Afficher un log toutes les 80 frames
                        console.log("A pressed");
                        setCount((count + 1) % Object.values(games).length); //incrémenter le compteur et le réinitialiser après avoir attein la fin de la liste
                        console.log(count);
                    }
                    setLogCount((logCount + 1) % 80); // Incrémenter le compteur et le réinitialiser après 80 frames
                  } else if(leftStickX == -1) {
                    if (logCount === 0) { // Afficher un log toutes les 80 frames
                        console.log("A pressed");
                         //un peu plus compliqué pour le sens inverse
                            if (count === 0) { //quand on arrive à 0
                              setCount(Object.values(games).length - 1); //on retourne à la fin de la liste
                            } else {
                              setCount(count - 1); //sinon on décrémente
                            }
                        
                        console.log(count);
                    }
                    setLogCount((logCount + 1) % 30); // Incrémenter le compteur et le réinitialiser après 80 frames
                  } else if(A) {
                    if(logCount === 0) {
                        // shell.openExternal(Object.values(games)[count].path);
                        if(Object.values(games)[count].path) {
                            shell.openExternal(Object.values(games)[count].path);
                        } else {
                            // navigate('/Pong');
                        }
                    }
                    setLogCount((logCount + 1) % 30);
                  } else {
                    setLogCount(0); // Réinitialiser le compteur lorsque le bouton A n'est pas pressé
                  }

                // if (count > gameList.length - 6) {
                //     setLastImageActive(true);
                // } else {
                //     setLastImageActive(false);
                // }
            }
        
      }, [count, gamepads]);

    if(!games) {
        return (
            <div className="App">
                <p>Loading...</p>
            </div>
        )
    } 


    const gameList = Object.values(games);
    const gameImages = gameList.map((game, index) => {
        const imageID = index === count ? 'active' : 'inactive'; //ne fonctionne pas, comment changer l'id de l'élément actif ?

        if(game.Image === null) {
            return
        } else {
            return (
                <div className="game" id={imageID} data-id="1">
                        <img key={game.id}  src={game.Image} className="gameImage"/>
                </div>
            );
        }
        
    });
    const activeGame = gameList[count];

    if(gamepads[0]) {
        if(gamepads[0].buttons[_buttons.B].pressed) {
            navigate('/');

        }
    }





    return (
        <div className="App">
            <img src={goBack} className="GoBack" />
            <img src={header} className="Header" />


            <div className="sections">
                <section className="YourGames">
                    <p className="yours">Vos jeux</p>
                    <div className={`gameTrack ${lastImageActive ? 'scroll' : ''}`}>
                        {gameImages}
                    </div>
                </section>

                <section className="GameInfo">
                    <div className="gameInfo">
                        <img src={activeGame.Image} className="gameImageD"/>

                        <p className="gameName">{activeGame.Name}</p>
                        <p className="gameDescription">{activeGame.Description}</p>
                    </div>
                </section>
            </div>
        </div>
    );

    
}

export default Play;

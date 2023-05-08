import { useState, useEffect } from "react";

import _buttons from "../buttons.json";
import { useGamepads } from "react-gamepads";
import { Link, useNavigate } from "react-router-dom";

import goBack from "../../assets/igprj/gui/goback.png";
import header from "../../assets/igprj/gui/cmgamesheader.png";
import pman from "../../assets/igprj/games/pman.png";
import noImage from "../../assets/igprj/games/No-Image.png";
import tetris from "../../assets/igprj/games/tetris.png";

import "./Play.css";



function Play() {  

  const [activeGame, setActiveGame] = useState(null);



  const [gamepads, setGamepads] = useState([]);

  const [logCount, setLogCount] = useState(0); // Ajout du compteur logCount
  const [leftCount, setLeftCount] = useState(0); // Ajout du compteur logCount

  useGamepads((_gamepads) => {
    setGamepads(Object.values(_gamepads));
  });

  const navigate = useNavigate();



  function selectLeft() {
        //get all actives ids
        var actives = document.querySelectorAll('#active')
        //get all games
        var games = document.querySelectorAll('.game')


        //same but reversed
        if(actives[0] == games[0]) {
            actives[0].id = 'inactive'
            games[1].id = 'active'
            setActiveGame(builtIn[2].game);
            console.log(activeGame);
        } else if (actives[0] == games[1]) {
            actives[0].id = 'inactive'
            games[2].id = 'active'
            setActiveGame(builtIn[0].game);
            console.log(activeGame);
        } else if (actives[0] == games[2]) {
            actives[0].id = 'inactive'
            games[0].id = 'active'
            setActiveGame(builtIn[1].game);
            console.log(activeGame);
        }

    
  }

  function selectRight() {
        //get all actives ids
        var actives = document.querySelectorAll('#active')
        //get all games
        var games = document.querySelectorAll('.game')


        //same but reversed
        if(actives[0] == games[0]) {
            actives[0].id = 'inactive'
            games[2].id = 'active'
            setActiveGame(builtIn[1]);
            console.log(activeGame);
        } else if (actives[0] == games[1]) {
            actives[0].id = 'inactive'
            games[0].id = 'active'
            setActiveGame(builtIn[2]);
            console.log(activeGame);
        } else if (actives[0] == games[2]) {
            actives[0].id = 'inactive'
            games[1].id = 'active'
            setActiveGame(builtIn[0]);
            console.log(activeGame);
        }
    }


  useEffect(() => {

    if (gamepads[0]) {
      if (gamepads[0].buttons[_buttons.B].pressed) {
        navigate("/");
      }

      // Remettre prevLeftStickX à 0 toutes les 800ms
        

  
      if(gamepads[0].buttons[_buttons.A].pressed) { 
        if (logCount === 0) { // Afficher un log toutes les 80 frames
          console.log('A');
          console.log('hey' + activeGame);
        }
        setLogCount((logCount + 1) % 80); // Incrémenter le compteur et le réinitialiser après 80 frames
      } else {
        setLogCount(0); // Réinitialiser le compteur lorsque le bouton A n'est pas pressé
      }

      const leftStickX = gamepads[0].axes[0];
      // Mettre à jour prevLeftStickX si l'axe gauche est utilisé
        if (leftStickX == 1 ) { //droite
            if (logCount === 0) { // Afficher un log toutes les 80 frames
              selectLeft()
            }
                setLogCount((logCount + 1) % 80); // Incrémenter le compteur et le réinitialiser après 80 frames
        } else if (leftStickX == -1) { //gauche
            if (leftCount === 0) { // Afficher un log toutes les 80 frames
                selectRight()
            }
                setLeftCount((leftCount + 1) % 80); // Incrémenter le compteur et le réinitialiser après 80 frames
        } else {
            setLeftCount(0); // Réinitialiser le compteur lorsque le bouton A n'est pas pressé
        }


    }
  }, [gamepads, logCount, navigate, leftCount]);

  if (gamepads[0]) {
    return (
      <div className="App">
        <img src={goBack} className="GoBack" />
        <img src={header} className="Header" />

        <div className="sections">
            <section className="YourGames">
            <p className="yours">Vos jeux</p>
            <div className="gameTrack">
                <div className="game" id="active" data-id="1">
                <img src={builtIn[0].image} className="gameImage" />
                </div>
                <div className="game" id="inactive" data-id="2">
                <img src={noImage} className="gameImage" />
                </div>
                <div className="game inactive" id="inactive" data-id="4">
                <img src={builtIn[2].image} className="gameImage" />
                </div>
            </div>
            </section>


            <section className="GameInfo">
                <div className="gameInfo">
                    <img src={builtIn[0].image} className="gameImageD" />

                    <p className="gameName">{builtIn[0].name}</p>
                    <p className="gameDescription">{builtIn[0].description}</p>
                </div>
            </section>
        </div>
        
      </div>
    );
  } else {
    return (
      <div className="App">
        <p>Connectez un controlleur et faites bouger un joystick</p>
      </div>
    );
  }
}

export default Play;

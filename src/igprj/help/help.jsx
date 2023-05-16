import ctrl1 from '../../assets/igprj/gui/ctrl1_4.png'
import './help.css'
import React, { useState, useEffect } from 'react';

//imports
import _buttons from '../buttons.json'
import { useGamepads } from 'react-gamepads'
import { Link, useNavigate } from 'react-router-dom'


function Help() {


    const [logCounty, setLogCounty] = useState(0); // Ajout du compteur logCount

    const navigate = useNavigate()
    const [gamepads, setGamepads] = useState([])
    useGamepads(_gamepads => {
        //console.log(_gamepads)
        setGamepads(Object.values(_gamepads))
    })


    useEffect(() => {
        // playSong()
        if(gamepads[0]) {            
                if(gamepads[0].buttons[_buttons.B].pressed) {
                    if (logCounty === 0) { // Afficher un log toutes les 80 frames
                        navigate('/');
                    }
                    setLogCounty((logCounty + 1) % 80); // Incrémenter le compteur et le réinitialiser après 80 frames
                }

            }
    }, [gamepads, logCounty, navigate])


    if(gamepads[0]) {


            
        if(!ctrl1) { // Vérifier si l'image est prête
            return (
                <div>
                    Chargement...
                </div>
            )
        }



        return(
            <div>
                <img src={ctrl1} className="ctrl1" alt='Chargement des contrôles. . .'/>
            </div>
        );
    }
  
}

export default Help;

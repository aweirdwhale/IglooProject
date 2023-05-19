import './credits.css'


import React, { useState, useEffect } from 'react';
import { useGamepads } from 'react-gamepads'
import { Link, useNavigate } from 'react-router-dom'

import _buttons from '../buttons.json'
import back from '../../assets/igprj/gui/goback.png'


const creds_noms = [
    "Igloo Project",
    "Quentin B.",
    "Claire",
    "Claire & Olivier",
    "Olivier",
    "Electron",
    "React + Vite",
    "Albatross <3"
];

const creds_fonct = [
    "Claire & Olivier :",
    "Effets Audio",
    "Designs",
    "Front-End",
    "Back-End",
    "Fait avec",
    "App avec",
    "Merci, "
]

const randomPosition = () => {
  const x = Math.floor(Math.random() * (window.innerWidth - 500) + 100);
  const y = Math.floor(Math.random() * (window.innerHeight - 500) + 100);
  return { x, y };
};

const randomPosition2 = () => {
    
    const x = Math.floor(Math.random() * (window.innerWidth - 500) + 100);
    const y = Math.floor(Math.random() * (window.innerHeight - 500) + 100);
    return { x, y };
  };

//faire une fonction qui retourne les items de creds_noms dans l'ordre
let i = 0
const credNoms = () => {
    i++
    if(i > creds_noms.length) {
        i = 0
    }
    return creds_noms[i];
}

let j = 0
const credFonc = () => {
    j++ 
    if(j > creds_fonct.length) {
        j = 0
    }
    return creds_fonct[j];
}




const Credits = () => {
    const navigate = useNavigate()
    const [gamepads, setGamepads] = useState([])
    useGamepads(_gamepads => {
        //console.log(_gamepads)
        setGamepads(Object.values(_gamepads))
    })

  const [logCounty, setLogCounty] = useState(0);
  const [cred_nom, setCred_nom] = useState('Igloo Project');
  const [cred_fonct, setCred_fonct] = useState('Un projet de NSI :');
  const [position, setPosition] = useState(randomPosition());
  const [position2, setPosition2] = useState(randomPosition2());

  useEffect(() => {
    if(gamepads[0]){
        //bouton B
        if(gamepads[0].buttons[_buttons.B].pressed) {
            if (logCounty === 0) { // Afficher un log toutes les 80 frames
                // audio.pause();
                // audio.currentTime = 0;

                navigate('/');
            }
            setLogCounty((logCounty + 1) % 80); // Incrémenter le compteur et le réinitialiser après 80 frames
        }
    }
  }, )


  useEffect(() => {
    const interval = setInterval(() => {
        console.log('UwU')
        setCred_nom(credNoms())
        setCred_fonct(credFonc())
      setPosition(randomPosition());
      setPosition2(randomPosition2())
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  if(gamepads[0]){
    return (
        <>
            <img src={back} className='goback'/>
            <div className='Wow' style={{ position: 'absolute', top: position.y, left: position.x, margin: '20px', lineHeight: '.1em'}}>
                <p className='Fonct'>{cred_fonct}</p>
                <p className='Noms'>{cred_nom}</p>

                <div className="rain2" >
                    <div className="waves">
                        <div></div>
                        <div></div>
                    </div>        
                </div>
            </div>
            
        </>
      );
  }
  
};

export default Credits;


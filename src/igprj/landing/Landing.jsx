import { useEffect, useState } from 'react'
import Update from '@/components/update'
import './Landing.css'
import centerHero from '../../assets/igprj/gui/midHero.png'
import hexagones from '../../assets/igprj/gui/bglayer2_2.png'
import ac from '../../assets/igprj/gui/aide.png'

import Drops from '../../components/bgDrops/drops'

import {GiGamepadCross} from 'react-icons/gi'

import _buttons from '../buttons.json'
import { useGamepads } from 'react-gamepads'
import { Link, useNavigate } from 'react-router-dom'

import song from '../../assets/igprj/songs/landing.wav'
import { IconContext } from 'react-icons'
export const audio = new Audio(song);


function Landing() {

    const [isPlaying, setIsPlaying] = useState(false)

    function playSong() {
        if(!isPlaying) {
            audio.pause();
            audio.currentTime = 0;
            audio.play();
            audio.loop = true;
            setIsPlaying(true)
        }
    }


    const [logCounty, setLogCounty] = useState(0); // Ajout du compteur logCount

    const navigate = useNavigate()
    const [gamepads, setGamepads] = useState([])
    useGamepads(_gamepads => {
        //console.log(_gamepads)
        setGamepads(Object.values(_gamepads))
    })
    
    //console.log(gamepads)
    
    // useEffect(() => {
    //     playSong()
    // }, [])

    useEffect(() => {
        playSong()
        // audio.pause();

        if(gamepads[0]) {
            
                //bouton X
                if(gamepads[0].buttons[_buttons.X].pressed) {
                    if (logCounty === 0) { // Afficher un log toutes les 80 frames
                        audio.pause();
                        // audio.currentTime = 0;

                        navigate('/Credits');
                    }
                    setLogCounty((logCounty + 1) % 80); // Incrémenter le compteur et le réinitialiser après 80 frames
                }

                //bouton Y
                if(gamepads[0].buttons[_buttons.Y].pressed) {
                    if (logCounty === 0) { // Afficher un log toutes les 80 frames
                        audio.pause();
                        // audio.currentTime = 0;
                        
                        navigate('/Help');
                    }
                    setLogCounty((logCounty + 1) % 80); // Incrémenter le compteur et le réinitialiser après 80 frames
                }

                //bouton A
                if(gamepads[0].buttons[_buttons.A].pressed) {
                    if (logCounty === 0) { // Afficher un log toutes les 80 frames
                        audio.pause();
                        // audio.currentTime = 0;
                        
                        navigate('/Play');
                    }
                    setLogCounty((logCounty + 1) % 80); // Incrémenter le compteur et le réinitialiser après 80 frames
                }
            }
    }, [gamepads, logCounty, navigate])


        if (gamepads[0]) {
            
                return (
                    <div className='App'>
                        <img src={centerHero} className='midHero'/>
                        <img src={hexagones} className='hexagones'/>

                        <img src={ac} className="aides" />
                        {/* <img src={controls} className='controls'/> */}
                        {/* <div className="c1"></div>
                        <div className="c2"></div>
                        <div className="c3"></div>
                        <div className="c4"></div> */}

                        <Drops  />
                    </div>
                )
            
            
        } else {
            return (
                

                <div className='App'>
                    <div class={gamepads[0] ? PopupHide : null} className='Popup'>
                        <div  >
                            <h1 >Aucun contrôleur trouvé</h1>
                            <p >Connectez-en un et appuyez sur le bouton start.</p>
                        </div>
                        
                        <GiGamepadCross size={'50px'}  id='PIcon'/>
                    </div>
                    <img src={centerHero} className='midHero'/>
                    <img src={hexagones} className='hexagones'/>
                    {/* <div className="c1"></div>
                    <div className="c2"></div>
                    <div className="c3"></div>
                    <div className="c4"></div> */}
                    <Drops  />
                </div>

            )
        }
            
}

export default Landing
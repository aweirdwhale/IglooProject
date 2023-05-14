import { useEffect, useState } from 'react'
import Update from '@/components/update'
import './Landing.css'
import centerHero from '../../assets/igprj/gui/midHero.png'
import hexagones from '../../assets/igprj/gui/bglayer2_2.png'
import ctrl1 from '../../assets/igprj/gui/ctrl1_2.png'

import _buttons from '../buttons.json'
import { useGamepads } from 'react-gamepads'
import { Link, useNavigate } from 'react-router-dom'

import song from '../../assets/igprj/songs/landing.wav'
export const audio = new Audio(song);


function Landing() {

    const [isGamepadConnected, setIsGamepadConnected] = useState(false)
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
        if(gamepads[0]) {
            if(gamepads[0].buttons[_buttons.BACK].pressed){
                if (logCounty === 0) { // Afficher un log toutes les 80 frames
                    setIsGamepadConnected(true)
                }
                setLogCounty((logCounty + 1) % 80); // Incrémenter le compteur et le réinitialiser après 80 frames
            } else {
                if(isGamepadConnected) {
                    playSong()
                    if(gamepads[0].buttons[_buttons.X].pressed) {
                        if (logCounty === 0) { // Afficher un log toutes les 80 frames
                            audio.pause();
                            audio.currentTime = 0;
                            navigate('/Play');
                        }
                        setLogCounty((logCounty + 1) % 80); // Incrémenter le compteur et le réinitialiser après 80 frames
                    }
                }
            }
        }

        
        
    }, [gamepads, logCounty, navigate])


        if (isGamepadConnected) {

            


            return (
                <div className='App'>
                    <img src={centerHero} className='midHero'/>
                    <img src={hexagones} className='hexagones'/>
                    {/* <img src={controls} className='controls'/> */}
                    <div className="c1"></div>
                    <div className="c2"></div>
                    <div className="c3"></div>
                    <div className="c4"></div>
                </div>
            )
        } else {
            return (
                <div className='App'>
                    <img src={ctrl1} className='ctrl1' />
                </div>
            )
        }
            
}

export default Landing
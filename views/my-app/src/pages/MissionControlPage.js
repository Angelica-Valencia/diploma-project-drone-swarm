import React, {useContext, useState, useEffect} from 'react'
import ControlPanel from "../ControlPanel";
import ThemeContext from "../ThemeContext";
import SwarmListContext from "../SwarmListContext";
import playLogo from '../play-circle-bold.svg'
import '../css/mission-control.css'
import pauseLogo from '../pause-bold-duotone.svg'
import batteryPlus from "../battery-plus2.svg";
import batteryAlert from "../battery-alert2.svg";
import speedIcon from '../speedtest.svg'
import tempIcon from '../temperature-high.svg'
import heightIcon from '../arrow-autofit-height-dotted-20-filled.svg'
import timeFlight from '../airplane-time.svg'
import rotateLeft from '../rotate-left.svg'
import rotateRight from '../rotate-right.svg'
import axios from "axios";

function MissionControlPage(){

    const { theme } =
    useContext(ThemeContext);

    const [videoPlay, setVideoPlay] = useState(false)
    const videoURL = 'http://localhost:8000/video-stream'

    const togglePlay = () => {
    setVideoPlay((prevState) => !prevState);
     };

    const [stats, setStats] = useState({});

    function streamDisplay(){
        if (videoPlay){

            return (
                <div className="video-container">
                    <img src={videoURL} style={{ width: "100%", height: "100%", margin: 0 }} alt='video-play'/>
                    <button onClick={togglePlay}
                            className='button-pause'>
                            <img className='img-pause-logo' src={pauseLogo} alt='Pause'/>
        </button>
                </div>

            );

        } else{
            return(
                <div className='play-div'>
                   <button className='button-play'
                            onClick={()=> reproduceVideo()}>
                    <img src={playLogo} alt='play-video-logo'/>
                </button>
                    <p>
                        Start Video
                    </p>
                </div>
            );
        }

    }

    function reproduceVideo(){
        setVideoPlay(true)
    }

    useEffect(() => {
            // Fetch swarm stats initially

            fetchSwarmStats().then(response => {
                                        if (response && response.data) {
                                            console.log(response.data);
                                        }
                                    })
                                        .catch(error => {
                                            console.log(error);
                                        });

            // Schedule fetching swarm stats every second
            const interval = setInterval(fetchSwarmStats, 10000);

            // Clean up the interval on component unmount
            return () => clearInterval(interval);

        }, []);

        const fetchSwarmStats = async () => {
            try {
                const response = await axios.get('http://localhost:8000/swarm/stats');
                console.log(typeof(response.data))
                console.log(response.data)
                setStats((JSON.parse(response.data)));
                console.log(stats.battery)
            } catch (error) {
                console.error('Error fetching swarm stats:', error);
            }
        };


    function displayBattery(){
        if (stats.battery >= 50){
            return <img className='img-battery' src={batteryPlus} alt={'battery-plus'} />;
        }
        else{
            return <img className='img-battery' src={batteryAlert} alt={'battery-alert'}/>;
        }
    };



    return(
        <div id={theme} className='container'>
            <div className='main-div'>

                <div className='stats'>
                    <h2 className='stats-tittle'>Statistics</h2>
                    <div className='stats-content'>
                        <div className='stat-component'>
                            <p>Battery:</p>
                            <p>{stats.battery}%</p>
                            {displayBattery()}
                        </div>
                        <div className='stat-component'>
                            <p>Speed:</p>
                            <p>{stats.speed} cms/s</p>
                            <img className='img-speed' src={speedIcon} alt='speed-icon'/>
                        </div>
                        <div className='stat-component'>
                            <p>Temperature:</p>
                            <p>{stats.temp} C°</p>
                            <img className='img-temp' src={tempIcon} alt='temp-icon'/>
                        </div>
                        <div className='stat-component'>
                            <p>Height:</p>
                            <p>{stats.height} cms</p>
                            <img className='img-height' src={heightIcon} alt='height-icon'/>
                        </div>
                        <div className='stat-component'>
                            <p>Time:</p>
                            <p>{stats.flight_time} sec</p>
                            <img className='img-time' src={timeFlight} alt='time-icon'/>
                        </div>
                    </div>

                </div>

                <div className='div-stream'>

                    {streamDisplay()}

                </div>

                <div className='div-control'>
                    <div className='div-control-top'>

                    </div>
                    <div className='div-control-mid'>

                    </div>
                    <img className='rotate-left' src={rotateLeft} alt='rotate-logo'/>
                    <ControlPanel/>
                    <img className='rotate-right' src={rotateRight} alt='rotate-logo'/>
                </div>



            </div>



        </div>
    );
}

export default MissionControlPage;
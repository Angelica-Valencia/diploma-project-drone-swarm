import React, {useContext, useState} from 'react'
import ControlPanel from "../ControlPanel";
import ThemeContext from "../ThemeContext";
import playLogo from '../play-circle-bold.svg'
import '../css/mission-control.css'

function MissionControlPage(){

    const { theme } =
    useContext(ThemeContext);

    const [videoPlay, setVideoPlay] = useState(false)
    const videoURL = 'http://localhost:8000/video-stream'

    const togglePlay = () => {
    setVideoPlay((prevState) => !prevState);
     };

    function streamDisplay(){
        if (videoPlay){

            return (
                <div className="video-container">
                    <img src={videoURL} style={{ width: "100%", height: "100%", margin: 0 }} alt='video-play'/>
                    <button onClick={togglePlay}>
                            {videoPlay ? "Pause" : "Play"}
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

    return(
        <div id={theme} className='container'>
            <div className='main-div'>

                <div className='stats'>

                </div>

                <div className='div-stream'>

                    {streamDisplay()}

                </div>

                <div className='div-control'>
                    <ControlPanel/>
                </div>



            </div>



        </div>
    );
}

export default MissionControlPage;
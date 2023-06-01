import React, {useContext} from 'react'
import ControlPanel from "../ControlPanel";
import ThemeContext from "../ThemeContext";
import '../css/mission-control.css'

function MissionControlPage(){

    const { theme } =
    useContext(ThemeContext);

    return(
        <div id={theme} className='container'>
            <div className='main-div'>

                <div className='stats'>

                </div>

                <div className='div-stream'>

                </div>

                <div className='div-control'>
                    <ControlPanel/>
                </div>



            </div>



        </div>
    );
}

export default MissionControlPage;
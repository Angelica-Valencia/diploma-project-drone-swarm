import React, {useContext} from 'react'
import ControlPanel from "../ControlPanel";
import ThemeContext from "../ThemeContext";

function MissionControlPage(){

    const { theme } =
    useContext(ThemeContext);

    return(
        <div id={theme}>
            <div className='main-div'>

            </div>


            <ControlPanel/>
        </div>
    );
}

export default MissionControlPage;
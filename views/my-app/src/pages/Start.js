import drone from '../drone.svg';
import '../css/App.css';
import React, {useContext} from "react";
import ThemeContext from "../ThemeContext";

function MyButton()
{
  function handleClick(){
    alert('You clicked me!')
  }
  return(
      <button onClick={handleClick} className='button'>
        Start!

      </button>
  );
}

function Start() {

    const { theme } =
    useContext(ThemeContext);
  return (
      <div id={theme}  className="Start">
      <header  className="Start-header">
        <img src={drone} className="Start-logo" alt="drone" />

        <div className="button-container">
          <MyButton className="button" />
        </div>

      </header>

    </div>

  );
}

export default Start;

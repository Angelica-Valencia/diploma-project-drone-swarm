import React, {useContext } from "react";
import { useNavigate } from 'react-router-dom';
import drone from '../drone.svg';
import '../css/App.css';
import ThemeContext from "../ThemeContext";




function Start() {

    const { theme } =
    useContext(ThemeContext);

    const navigate = useNavigate();

function MyButton()
{
  function handleClick(){
    navigate('/dashboard');
  }
  return(
      <button onClick={handleClick} className='button'>
        Start!

      </button>
  );
}



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

import React, {useContext} from 'react';
import './css/control-panel.css';
import ThemeContext from "./ThemeContext";

const ControlPanel = () => {

    const { theme } =
    useContext(ThemeContext);
  return (
      <div className='wrapper' id={theme}>
          <div className="control-panel" >
          <div className="arrow-up"></div>
          <div className="arrow-down"></div>
          <div className="arrow-left"></div>
          <div className="arrow-right"></div>
          <div className="stop-button">Stop</div>
    </div>
      </div>

  );
};

export default ControlPanel;

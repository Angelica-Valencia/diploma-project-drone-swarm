import React from 'react';
import './css/control-panel.css';

const ControlPanel = () => {
  return (
    <div className="control-panel">
      <div className="arrow-up"></div>
      <div className="arrow-down"></div>
      <div className="arrow-left"></div>
      <div className="arrow-right"></div>
      <div className="stop-button">Stop</div>
    </div>
  );
};

export default ControlPanel;

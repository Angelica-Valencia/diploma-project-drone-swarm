import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/navigation-bar.css'
import ThemeContext from "./ThemeContext";

const NavigationBar = () => {

   const {theme} = useContext(ThemeContext)
  const location = useLocation();

  // Array of routes where the navigation bar should be displayed
  const showNavigationBarRoutes = ['/', '/dashboard', '/settings', '/mission-control'];

  // Check if the current route matches any of the showNavigationBarRoutes
  const shouldDisplayNavigationBar = showNavigationBarRoutes.includes(location.pathname);

  // Return null if the navigation bar should not be displayed on the current route
  if (!shouldDisplayNavigationBar) {
    return null;
  }



  return (

    <nav id={theme} >
      <div className="navbar">
          <ul className="nav-list">
             <li className="nav-item">
              <Link to="/" className="nav-link">Start</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/mission-control" className="nav-link">Missions</Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">Settings</Link>
            </li>
          </ul>
      </div>

    </nav>
  );
};

export default NavigationBar;

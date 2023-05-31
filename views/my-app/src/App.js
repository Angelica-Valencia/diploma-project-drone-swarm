import './css/App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import {Start, SettingsPage, DashboardPage, MissionControlPage, NotFoundPage} from './pages'
import ThemeProvider from "./ThemeProvider.js";
import DroneListProvider from "./DroneListProvider";

import './css/settings.css'


function App() {


  return (
      <ThemeProvider>
          <div className='App'>

           <BrowserRouter>
               <Link to={"/"}>Go to Start</Link>
               <Link to={"/settings"}>Go to Settings</Link>
               <Link to={"/dashboard"}>Go to Dashboard</Link>
                <Routes>
                  <Route exact path="/" element={<Start/>}/>
                </Routes>
               <DroneListProvider>
                   <Routes>
                    <Route path='/settings' element={<SettingsPage/>}/>
                </Routes>
               </DroneListProvider>

                <Routes>
                    <Route path='/dashboard' element={<DashboardPage/>}/>
                </Routes>
                <Routes>
                    <Route path='/mission-control' element={<MissionControlPage/>}/>
                </Routes>
                <Routes>
                    <Route path='/not' element={<MissionControlPage/>}/>
                </Routes>
               <Routes>
                    <Route element={<NotFoundPage/>}/>
                </Routes>
    </BrowserRouter>
      </div>
      </ThemeProvider>


  );
}

export default App;

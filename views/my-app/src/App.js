import './css/App.css';
import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {Start, SettingsPage, DashboardPage, MissionControlPage, NotFoundPage} from './pages'
import ThemeProvider from "./ThemeProvider.js";
import DroneListProvider from "./DroneListProvider";
import SwarmListProvider from "./SwarmListProvider";
import IsOnMissionProvider from "./IsOnMissionProvider";
import NavigationBar from "./NavigationBar";


function App() {


  return (
      <ThemeProvider>
          <IsOnMissionProvider>
              <div className='App'>

           <BrowserRouter>
               <NavigationBar/>

                <Routes>
                  <Route exact path="/" element={<Start/>}/>
                </Routes>

               <DroneListProvider>
                   <Routes>
                    <Route path='/settings' element={<SettingsPage/>}/>
                </Routes>

                   <SwarmListProvider>
                       <Routes>
                    <Route path='/dashboard' element={<DashboardPage/>}/>
                </Routes>

                   <Routes>
                    <Route path='/mission-control' element={<MissionControlPage/>}/>
                </Routes>
                   </SwarmListProvider>

               </DroneListProvider>

               <Routes>
                    <Route element={<NotFoundPage/>}/>
                </Routes>
    </BrowserRouter>
      </div>
          </IsOnMissionProvider>
      </ThemeProvider>


  );
}

export default App;

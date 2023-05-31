import React, { useState, useContext} from 'react';
import '../css/settings.css'
import ReactSwitch from "react-switch";
import baseline from '../baseline-delete.svg'
import ThemeContext from "../ThemeContext";
import DroneListContext from "../DroneListContext";




function SettingsPage(){


    // const [theme, setTheme] = useState('dark')

    const { theme, toggleDarkTheme, toggleMediumTheme, toggleLightTheme } =
    useContext(ThemeContext);

    const { droneList, setDroneList } = useContext(DroneListContext)

    const [ipAddressForm, setIpAddress] = useState('');
    const [nameForm, setName] = useState('');



    function createTwoButtonAlert(e){
        if (window.confirm(`Are you sure you want to save the drone ${nameForm}@${ipAddressForm} into the database?`)) {

              const newDrone = {name:nameForm, ipAddress:ipAddressForm};
              setDroneList(prevList => [...prevList, newDrone]);
              e.preventDefault()
              alert(`The drone ${nameForm}@${ipAddressForm} was saved to the database.`);
            } else {
              // Do nothing!
              alert('Thing was not saved to the database.');
            }

        setIpAddress('');
        setName('');

    }

    function deleteDrone(drone){
        if (window.confirm(`Are you sure you want to delete the drone ${drone.name}@${drone.ipAddress} from the database?`)) {
              const updatedList = droneList.filter((item) => item !== drone);
              setDroneList(updatedList);
              alert(`The drone ${drone.name}@${drone.ipAddress} was not deleted from the database.`);
            } else {
              // Do nothing!
              alert('Thing was not saved to the database.');
            }
    }

    return(

        <div className='Settings' id={theme}>

                <div className='head-settings'>
                    <h1 className='Tittle-Settings'>Settings</h1>
                    <button className='button-save' onClick={e =>{
                        alert(`All changes have been saved!`)
                    }}>Save</button>

                </div>

                <div className='theme-settings'>
                    <h2>Appearance</h2>
                    <div className='theme-container'>
                        <p>Theme:</p>
                        <div className='theme-options'>
                            <div className='dark-toggle'>
                                <p>Dark</p>
                                <ReactSwitch
                                    checked={theme === 'dark'}
                                    onChange={toggleDarkTheme}
                                    onColor='#5E548E'
                                    offColor='#D9D9D9'
                                    uncheckedIcon={false}
                                    checkedIcon={false}/>
                            </div>
                            <div className='medium-toggle'>
                                <p>Medium</p>
                                <ReactSwitch
                                    checked={theme === 'medium'}
                                    onChange={toggleMediumTheme}
                                    onColor='#BE95C4'
                                    offColor='#D9D9D9'
                                    uncheckedIcon={false}
                                    checkedIcon={false}/>
                            </div>
                            <div className='light-toggle'>
                                <p>Light</p>
                                <ReactSwitch
                                    checked={theme === 'light'}
                                    onChange={toggleLightTheme}
                                    onColor='#EFD6E3'
                                    offColor='#D9D9D9'
                                    uncheckedIcon={false}
                                    checkedIcon={false}/>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='drone-settings'>
                    <h2>Drone Settings</h2>
                    <form>
                        <h3>Add new drone</h3>
                        <div className='form-fields'>
                            <label>
                                IP Address:

                                <input
                                type='text'
                                value={ipAddressForm}
                                onChange={e => setIpAddress(e.target.value)}/>
                            </label>
                            <label>
                                Name:
                                <input
                                type='text'
                                value={nameForm}
                                onChange={e => setName(e.target.value)}/>
                            </label>


                            <button
                                className='button-add'
                                onClick={createTwoButtonAlert}>Add</button>
                        </div>
                    </form>
                </div>

                <div className='drone-list'>
                    <h3>Drone List</h3>
                    <ul>
                        {droneList.map((drone, index) => (

                            <div className='list-div'>
                                <li key={index}>{drone.name}@{drone.ipAddress}</li>
                                <button
                                    className='delete-logo'
                                    onClick={() => deleteDrone(drone)}>
                                    <img src={baseline}  alt='delete'/>
                                </button>
                            </div>

                        ))}
                     </ul>
                </div>

        </div>

    );
}

export default SettingsPage;
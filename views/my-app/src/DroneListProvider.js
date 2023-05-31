import React, { useState } from 'react';
import DroneListContext from './DroneListContext';

function DroneListProvider({ children }) {
    const DroneList = [{name: 'x-508', ipAddress:'192.168.1.2'},
                       {name: 'x-602', ipAddress:'191.153.1.2'},
                       {name: 'x-422', ipAddress: '195.342.1.1'},
                       {name: 'x-754', ipAddress: '193.178.2.2'}]

    const [droneList, setDroneList] = useState(DroneList);

    // useEffect(() => {
    //     // Save the droneList to local storage as a string
    //     localStorage.setItem('droneList', JSON.stringify(droneList));
    //   }, [droneList]);
    //
    //   useEffect(() => {
    //         // Retrieve the droneList from local storage and parse it back into a list
    //         const storedDroneList = localStorage.getItem('droneList');
    //         if (storedDroneList) {
    //           setDroneList(JSON.parse(storedDroneList));
    //         }
    //   }, []);

    const droneListContextValue = {
        droneList,
        setDroneList
    };

    return (
        <DroneListContext.Provider value={droneListContextValue}>
            {children}
        </DroneListContext.Provider>
    );
}
export default DroneListProvider;
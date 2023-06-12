import React, { useState } from 'react';
import IsOnMissionContext from "./IsOnMissionContext";

function IsOnMissionProvider({ children }) {

    const [isOnMission, setIsOnMission] = useState(false);


    const isOnMissionContextValue = {
        isOnMission,
        setIsOnMission
    };

    return (
        <IsOnMissionContext.Provider value={isOnMissionContextValue}>
            {children}
        </IsOnMissionContext.Provider>
    );
}
export default IsOnMissionProvider;
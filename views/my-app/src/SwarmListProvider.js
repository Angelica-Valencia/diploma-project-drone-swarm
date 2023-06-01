import React, { useState } from 'react';
import SwarmListContext from "./SwarmListContext";

function SwarmListProvider({ children }) {
    const SwarmList = [{name: 'x-508', ipAddress:'192.168.1.2'},
                       {name: 'x-602', ipAddress:'191.153.1.2'}]

    const [swarmList, setSwarmList] = useState(SwarmList);


    const swarmListContextValue = {
        swarmList,
        setSwarmList
    };

    return (
        <SwarmListContext.Provider value={swarmListContextValue}>
            {children}
        </SwarmListContext.Provider>
    );
}
export default SwarmListProvider;
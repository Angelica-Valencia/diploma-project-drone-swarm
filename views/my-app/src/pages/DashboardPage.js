import React, {useContext, useState} from 'react'
import '../css/dashboard.css'
import ThemeContext from "../ThemeContext";
import DroneListContext from "../DroneListContext";
import droneImg from '../drone.svg'
import batteryPlus from '../battery-plus.svg'
import batteryAlert from '../battery-alert.svg'
import SwarmListContext from "../SwarmListContext";
import baseline from "../baseline-delete.svg";
import axios from 'axios';


function DashboardPage(){

    const max = 100;
    const min = 0;

    const { theme } =
    useContext(ThemeContext);

    const { droneList } = useContext(DroneListContext)

    const { swarmList, setSwarmList} = useContext(SwarmListContext)

    const [droneInfo, setDroneInfo] = useState(droneList[0])

    function handleClick({drone}){
        setDroneInfo(drone)
    }


    function CarouselItem({drone}){
        return(
            <div className='carousel-item' onClick={() => handleClick({drone})}>
                <img src={droneImg} alt='drone'/>
                <p>Drone {drone.name}</p>
            </div>
        );
    }

    function displayBattery(batteryLevel){
        if (batteryLevel >= 50){
            return <img className='img-battery' src={batteryPlus} alt={'battery-plus'} />;
        }
        else{
            return <img className='img-battery' src={batteryAlert} alt={'battery-alert'}/>;
        }
    }

    const dronesInfoList = droneList.map(drone =>{
        return {[drone.ipAddress]: {
            battery: Math.floor(Math.random() * (max - min + 1)) + min
        } }
    });

    function addToSwarm(drone){
        if (window.confirm(`Are you sure you want to add the drone ${drone.name}@${drone.ipAddress} to the swarm?`)) {

              const newDrone = {name:drone.name, ipAddress:drone.ipAddress};
              setSwarmList(prevList => [...prevList, newDrone]);
              alert(`The drone ${drone.name}@${drone.ipAddress} was added to the swarm.`);
            } else {
              // Do nothing!
              alert('The drone was not added to the swarm.');
            }

    }

    function deleteDrone(drone){
        if (window.confirm(`Are you sure you want to delete the drone ${drone.name}@${drone.ipAddress} from the swarm?`)) {
              const updatedList = swarmList.filter((item) => item !== drone);
              setSwarmList(updatedList);
              alert(`The drone ${drone.name}@${drone.ipAddress} was not deleted from the swarm.`);
            } else {
              // Do nothing!
              alert('Thing was not saved to the database.');
            }
    }

    const sendSwarmToServer = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/swarm', swarmList, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

sendSwarmToServer()
  .then(response => {
    if (response && response.data) {
      console.log(response.data);
    }
  })
  .catch(error => {
    console.log(error);
  });

    return(
        <div id={theme} className='main'>
            <div className='dashboard-container'>

                <div className='drones-view'>
                    {droneList.map( (droneItem, index) =>
                        <CarouselItem key={index} drone={droneItem}/>)}

                </div>

                <div className='drone-info'>
                    <h3>Drone {droneInfo.name}</h3>
                    <div className='battery-info'>
                        <p>Battery</p>
                        <p className='battery-level'>
                            {dronesInfoList[droneList.indexOf(droneInfo)][droneInfo.ipAddress]["battery"]}%
                            {displayBattery(dronesInfoList[droneList.indexOf(droneInfo)][droneInfo.ipAddress]["battery"])}
                        </p>
                    </div>
                    <div className='ip-info'>
                        <p>IP_Address</p>
                        <p>{droneInfo.ipAddress}</p>
                    </div>

                </div>

                <div className='div-add-swarm'>
                    <button onClick={() => addToSwarm(droneInfo)}
                            disabled={swarmList.some((drone) => drone.ipAddress === droneInfo.ipAddress)}
                            className={swarmList.some((drone) => drone.ipAddress === droneInfo.ipAddress) ? 'disabled-button': 'active-button'}>Add</button>
                </div>

                <div className='swarmList'>
                    <h2>Swarm</h2>

                    <ul>
                        {
                            swarmList.map((drone, index) => (

                                <div className='div-swarm-list'>
                                    <li key={index}>{drone.name}@{drone.ipAddress}</li>
                                    <button
                                    className='delete-logo'
                                    onClick={() => deleteDrone(drone)}>
                                    <img src={baseline}  alt='delete'/>
                                </button>
                                </div>
                            ))
                        }
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default DashboardPage;
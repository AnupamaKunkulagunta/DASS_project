import React,{useState, useContext, useEffect} from 'react'
// import {SwarmContext} from "../Context/SwarmContext_Reducer";
import MapContext from "../Map/MapContext";
import { SwarmInfoMQTT } from "../Publisher";
import { vector } from '../Source';
import { isEmpty } from 'ol/extent';
import LocateSwarmControl from '../Controls/LocateSwarmControl';

export default function SwarmDropDown({source, ID}) {
    const {map} = useContext(MapContext); 
    // const {currSwarmID, setCurrSwarmID}=useContext(SwarmIDContext)
    // const {currSwarmID, setCurrSwarmID, moveSwarm} = useContext(SwarmContext)
    const [currSwarmID, setCurrSwarmID]=useState(1)

    useEffect(()=>{
        localStorage.setItem("currSwarmID",currSwarmID)
    },[currSwarmID])

    //Function for showing doggle menu for SwarmIDs
    function toggleDropdown(ID=null) {
        if(ID){
            setCurrSwarmID(ID)
            console.log(currSwarmID)
            //console.log("From drop down",source)
        }
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
            else {
                openDropdown.classList.add('show');
            }
        }
    }

    //Function to focus on the swarm in the toggle menu
    const locateSwarm = (swarmID) => {
        let updatedVector = vector({})
        for (let i = 6*(swarmID-1)+1; i < 6*swarmID + 1; i++) {
          const swarmDrone = source.getFeatureById(i)
          updatedVector.addFeature(swarmDrone);
        }
        const extent = updatedVector.getExtent();
        if (isEmpty(extent))
          return;
  
        const view = map.getView();
  
        view.fit(extent, {
          maxZoom: 22,
          duration: 500,
          padding: [100, 100, 100, 100],
        });
    }
  
    return (
    <div className="dropdown">
        <button className="dropbtn" onClick={() => {toggleDropdown()}} >Swarm ID : {currSwarmID}</button>
        <div className="dropdown-content">
            {/* {Array(3).fill(null).map((value, i) => ( */}
                <a onClick={() => {toggleDropdown(1); locateSwarm(1) }}> <SwarmInfoMQTT topic="request" message={JSON.stringify({ id: 1, task: "info" })} text={1} /> </a>
                <a onClick={() => {toggleDropdown(2); locateSwarm(2) }}> <SwarmInfoMQTT topic="request" message={JSON.stringify({ id: 2, task: "info" })} text={2} /> </a>
                <a onClick={() => {toggleDropdown(3); locateSwarm(3) }}> <SwarmInfoMQTT topic="request" message={JSON.stringify({ id: 3, task: "info" })} text={3} /> </a>
            {/* ))} */}
        </div>
    </div>
  )
}

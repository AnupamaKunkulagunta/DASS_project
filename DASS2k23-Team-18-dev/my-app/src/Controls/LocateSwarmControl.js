import React, { useState, useEffect, useContext } from 'react';
import MapContext from "../Map/MapContext";
import { Control } from "ol/control";
import { isEmpty } from 'ol/extent';
import { vector } from '../Source';
// import SwarmContext from '../Context/SwarmContext';

export default function LocateSwarmControl({source}) {
    const { map } = useContext(MapContext);
    const [currSwarmID, setcurrSwarmID]=useState(1)
    setInterval(()=>{
      setcurrSwarmID(localStorage.getItem("currSwarmID"))
    },1000)

  useEffect(() => {
    if (!map)
      return;
    console.log("from LocateDrone", source);
    const button = document.createElement('button');
    button.className = `locate-bt`
    button.innerHTML = `Locate Swarm`;
    button.addEventListener('click', () => {
      let updatedVector = vector({})
      for (let i = 6*(currSwarmID-1)+1; i < 6*currSwarmID + 1; i++) {
        const swarmDrone = source.getFeatureById(i)
        // console.log("UPDA", i, swarmDrone)
        updatedVector.addFeature(swarmDrone);
      }
      const extent = updatedVector.getExtent();
      console.log("from LocateDrone extent", updatedVector);
      if (isEmpty(extent))
        return;

      const view = map.getView();

      view.fit(extent, {
        maxZoom: 22,
        duration: 500,
        padding: [100, 100, 100, 100],
      });
    });

    const locateDrone = new Control({element: button});

    map.controls.push(locateDrone)
    return () => map.controls.remove(locateDrone);
  }, [map]);

  return null;
}

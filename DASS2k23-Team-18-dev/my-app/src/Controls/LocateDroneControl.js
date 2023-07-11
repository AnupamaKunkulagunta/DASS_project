import React, { useEffect, useContext } from 'react';
import MapContext from "../Map/MapContext";
import { Control } from "ol/control";
import { isEmpty } from 'ol/extent';
import { Vector } from 'ol/source';
import { vector } from '../Source';
const LocateDroneControl = ({ source }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map)
      return;
    console.log("from LocateDrone", source);
    const button = document.createElement('button');
    button.className = 'locate-bt'
    button.innerHTML = 'Locate Drones';
    button.addEventListener('click', () => {
 
      const extent = source.getExtent();
      // console.log("from LocateDrone extent", updatedVector);
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
};

export default LocateDroneControl;

import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useSubscription } from 'mqtt-react-hooks';
import { Feature } from 'ol';
import { Style, Icon } from 'ol/style';
import { Point } from 'ol/geom';
import { fromLonLat } from "ol/proj";

import droneIcon from "../drone.png";

const DroneSubscriber = ({ source }) => {
  const droneList=[]
  for(let i=0; i<18; i++){
    droneList.push(`drone/${i+1}`)
  }

  const { message } = useSubscription(droneList);

  useEffect(() => {
    if (!message)
      return;

    const data = JSON.parse(message.message);
    // console.log("FROM DS data", data.id)
    // Create the drone if its ID is not found i.e assume the drone has been newly added
    if (!source.getFeatureById(data.id)) {
      const newMarker = new Feature();
      newMarker.setId(data.id);
      source.addFeature(newMarker);
    }
    // console.log("from DS", source.getFeatureById(data.id))
    const droneMarker = source.getFeatureById(data.id)

    // Update the drone's position
    const position = new Point(fromLonLat(data.lonlat));
    // transform([data.lonlat[0], zone.lonlat]), 'EPSG:4326', 'EPSG:3857')
    droneMarker.setGeometry(position);

    // Style the drone marker
    const iconStyle = new Style({
      image: new Icon({
        src: droneIcon,
        scale: 0.15,
      }),
      zIndex: 2,
    });
    droneMarker.setStyle(iconStyle);

  }, [message])

  return (
    <Fragment>
    </Fragment>
  )
}

export default DroneSubscriber;

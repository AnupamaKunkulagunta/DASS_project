import React from 'react';
import { useEffect } from 'react';
import { useSubscription } from 'mqtt-react-hooks';
import { Feature } from 'ol';
import { Style, Icon } from 'ol/style';
import { Point } from 'ol/geom';
import { fromLonLat } from "ol/proj";

import portIcon from "../port.png";

const PortSubscriber = ({ source }) => {
  const { message } = useSubscription([ 'ports/locations' ]);

  useEffect(() => {
    if (!message)
      return;

    const data = JSON.parse(message.message);

    if (!source.getFeatureById(data.id)) {
        const newMarker = new Feature();
        newMarker.setId(data.id);
        source.addFeature(newMarker);
      }
    const droneMarker = source.getFeatureById(data.id)

    // Update the drone's position
    const position = new Point(fromLonLat(data.lonlat));
    droneMarker.setGeometry(position);

    // Style the drone marker
    const iconStyle = new Style({
      image: new Icon({
        src: portIcon,
        scale: 0.1,
      }),
      zIndex: 1,
    });
    droneMarker.setStyle(iconStyle);

  }, [message])

  return (
    <>
    </>
  )
}

export default PortSubscriber;

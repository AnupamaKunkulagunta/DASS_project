import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useSubscription } from 'mqtt-react-hooks';
import { Feature } from 'ol';
import { Style, Icon } from 'ol/style';
import { Point } from 'ol/geom';
import { fromLonLat } from "ol/proj";

import debrisIcon from "../debris.png";

export default function DebrisSubscriber({ source }) {
    const debrisList=[]
    for(let i=0; i<500; i++){
        debrisList.push(`debri/${i+20}`)
    }
    
    const { message } = useSubscription(debrisList);
    
    useEffect(() => {
        if (!message)
        return;
    
        const data = JSON.parse(message.message);
    
        // Create the debris if its ID is not found i.e assume the debris has been newly added
        if (!source.getFeatureById(data.id)) {
            const newMarker = new Feature();
            newMarker.setId(data.id);
            source.addFeature(newMarker);
        }
    
        const debrisMarker = source.getFeatureById(data.id)
    
        // Update the debris's position
        const position = new Point(fromLonLat(data.lonlat));
        // transform([data.lonlat[0], zone.lonlat]), 'EPSG:4326', 'EPSG:3857')
        debrisMarker.setGeometry(position);
    
        // Style the debris marker
        const iconStyle = new Style({
        image: new Icon({
                src: debrisIcon,
                scale: 0.2,
            }),
            zIndex: 2,
        });
        debrisMarker.setStyle(iconStyle);
    
    }, [message])
    
    return (
        <Fragment>
        </Fragment>
    )
}

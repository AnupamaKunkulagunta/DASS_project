import React from 'react';
import { useEffect } from 'react';
import { useSubscription } from 'mqtt-react-hooks';
import { Feature } from 'ol';
import { Style, Icon } from 'ol/style';
import { Point } from 'ol/geom';
import { fromLonLat } from "ol/proj";
import Polyline from 'ol/format/Polyline';
import { Fill, Circle as CircleStyle, Stroke }
    from 'ol/style'; import LineString from 'ol/geom/LineString.js';

const WaypointSubscriber = ({ source }) => {
    const { message } = useSubscription(['drones/waypoints']);
    //console.log(message)

    useEffect(() => {
        if (!message)
            return;

        const data = JSON.parse(message.message);

        var polyline = new Polyline({
            factor: 1e6
        }).writeGeometry(new LineString(data.waypoints));

        if (source.getFeatureById(data.id)) {
            const pathMarker = source.getFeatureById(data.id)
            source.removeFeature(pathMarker)
        }

        const newPath = new Feature({
            type: 'route',
            geometry: new Polyline({ factor: 1e6, }).readGeometry(
                polyline, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857',
            })
        });
        newPath.setId(data.id)
        source.addFeature(newPath)

        var routeStyle = new Style({
            stroke: new Stroke({
                width: 6,
                color: [237, 0, 0, 0.8],
                // TODO: Find a way to get gradient
            }),
        });
        newPath.setStyle(routeStyle);

    }, [message]);

    return (
        <>
        </>
    )
}

export default WaypointSubscriber;

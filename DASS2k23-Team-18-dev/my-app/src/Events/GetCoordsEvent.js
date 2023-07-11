import React, { useContext, useEffect, useState } from "react";
import MapContext from "../Map/MapContext";
import * as ol from "ol"
import { transform } from "ol/proj";

import { Publisher } from "../Publisher";

// const GetCoordsEvent = () => {
// 	const { map } = useContext(MapContext);

// 	useEffect(() => {
// 		if (!map) return;

//         map.on('click', function(evt){
//             var lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
//             var lon = lonlat[0];
//             var lat = lonlat[1];
//             console.log(lonlat);
//             alert("Lonitude:" + lon + "\nLatitude: " + lat);
//         });

// 	}, [map]);

// 	return null;
// };

const GetCoordsEvent = () => {
    let currSwarmID=localStorage.getItem("currSwarmID")
    const { map } = useContext(MapContext);
    const wayPointID = 'W'+currSwarmID

    const [currWaypoints, setCurrWaypoints] = useState([])
    const [addWaypoints, setAddWaypoints] = useState(false)

    useEffect(() => {
        if (!map) return;

        map.on('click', function (evt) {

            if (!addWaypoints) {
                return;
            }

            const lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
            setCurrWaypoints([...currWaypoints, lonlat]);
        })
    })

    function clearWaypoints() {
        setAddWaypoints(false)
        setCurrWaypoints([])
    }

    return (
        <>
            <div style={{ position: 'absolute', zIndex: '3', left:'40%', top:'10px' }} >
                <button onClick={() => { setAddWaypoints(true) }}>Add Waypoints</button>
                <button onClick={() => { clearWaypoints() }}>Clear Waypoints</button>
                <Publisher topic="drones/waypoints" message={JSON.stringify({ id: wayPointID, waypoints: currWaypoints })} text="Publish Waypoints" />
            </div>
        </>
    )
}

export default GetCoordsEvent;
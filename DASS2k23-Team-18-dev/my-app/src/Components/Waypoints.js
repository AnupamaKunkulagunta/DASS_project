// import React, { useRef } from "react";
// import { useContext } from "react";
// import { useState, useEffect } from "react";
// import MapContext from "../Map/MapContext";
// import { transform } from "ol/proj";

// import { Publisher } from "../Publisher";

// const Waypoints = ( {currDroneID} ) => {
//     const { map } = useContext(MapContext);

//     const [currWaypoints, setCurrWaypoints] = useState([])
//     const [addWaypoints, setAddWaypoints] = useState(false)

//     useEffect(() => {
//         if (!map) return;

//         map.on('click', function (evt) {

//             if (!addWaypoints) {
//                 return;
//             }
            
//             const lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
//             setCurrWaypoints([...currWaypoints, lonlat]);
//         })
//     })

//     function clearWaypoints() {
//         setAddWaypoints(false)
//         setCurrWaypoints([])
//     }

//     return (
//         <>
//             <button onClick={() => { setAddWaypoints(true) }}>Add Waypoints</button>
//             <br /><br />
//             <button onClick={() => { clearWaypoints() }}>Clear Waypoints</button>
//             <br /><br />
//             <Publisher topic="drones/tasks" message={JSON.stringify({ id: currDroneID, task: "waypoints", waypoints: { currWaypoints } })} text="Publish Waypoints" />
//         </>
//     )
// }

// export default Waypoints;
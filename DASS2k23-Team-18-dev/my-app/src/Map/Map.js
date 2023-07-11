// import React, { useState, useEffect } from "react"
// import "./Map.css";
// import MapContext from "./MapContext";
// import * as ol from "ol"
// import Point from "ol/geom/Point"
// import { Waypoints } from "../Components";
// import { transform } from "ol/proj";

// const Map = ({ children, zoom, center, mapRef }) => {
// 	const [map, setMap] = useState(null);
// 	const handleScreenClick = (event) => {
// 		console.log('Screen Clicked', event);
// 	}
// 	// on component mount
// 	useEffect(() => {
// 		let options = {
// 			view: new ol.View({ zoom, center }),
// 			layers: [],
// 			controls: [],
// 			events: [],
// 			overlays: [],
// 			components: [],
// 			style: 'filter:grayscale(100%)',
// 		};
// 		// TODO: find feature to change map aesthetic
// 		let mapObject = new ol.Map(options);
// 		mapObject.setTarget(mapRef.current);
// 		setMap(mapObject);
// 		mapObject.on('click', function (evt) {
// 			console.log(transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
// 		});
// 		var layer = new ol.layer.Vector({
// 			source: new ol.source.Vector({
// 				features: [
// 					new ol.Feature({
// 						geometry: new Point(ol.proj.fromLonLat([4.35247, 50.84673]))
// 					})
// 				]
// 			})
// 		});
// 		map.addLayer(layer);
// 		// window.addEventListener('click', handleScreenClick)
// 		return () => mapObject.setTarget(undefined);
// 	}, []);

// 	// zoom change handler
// 	useEffect(() => {
// 		if (!map) return;

// 		map.getView().setZoom(zoom);
// 	}, [zoom]);

// 	// center change handler
// 	useEffect(() => {
// 		if (!map) return;

// 		map.getView().setCenter(center)
// 	}, [center])

// 	// map.on('click', function (evt) {
// 	// 	var lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
// 	// 	var lon = lonlat[0];
// 	// 	var lat = lonlat[1];
// 	// 	alert("You clicked near lat lon: " + lon.toFixed(6) + "  " + lat.toFixed(6));
// 	// });
// 	// window.on('click', function (evt) {
// 	// 	console.log(transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
// 	// });
// 	// if (map != null) {
// 	// 	map.on('click', console.log('Clicked'))
// 	// }
// 	return (
// 		<MapContext.Provider value={{ map }}>
// 			<div ref={mapRef} className="ol-map">
// 				{children}
// 			</div>
// 		</MapContext.Provider>
// 	)
// }

// export default Map;



import React, { useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import { Waypoints } from "../Components";

const Map = ({ children, zoom, center, mapRef }) => {
	const [map, setMap] = useState(null);

	// on component mount
	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: [],
			events: [],
			overlays: [],
			components: []
		};
		// TODO: find feature to change map aesthetic

		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		return () => mapObject.setTarget(undefined);
	}, []);

	// zoom change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setCenter(center)
	}, [center])

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default Map;
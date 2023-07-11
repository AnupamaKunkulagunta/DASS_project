import React, { useRef, useState, useEffect, useContext} from "react";

//Contexts
// import SwarmContext from "./Context/SwarmContext";

// Map imports
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./Source";
import { fromLonLat, get } from "ol/proj";
import { Controls, FullScreenControl, LocateDroneControl } from "./Controls"
import { Events, GetCoordsEvent } from "./Events";
import FeatureStyles from "./Features/Styles";
import Polyline from "ol/format/Polyline";
import VectorSource from "ol/source/Vector";
import { Fill, Circle as CircleStyle, Stroke } from "ol/style";
import LineString from "ol/geom/LineString.js";
import mapConfig from "./config.json";
import { transform } from 'ol/proj';
import LocateSwarmControl from "./Controls/LocateSwarmControl"
import SwarmMenu from "./Components/SwarmMenu";

// Backend and Protocol related imports
import { Connector } from "mqtt-react-hooks";
import DebrisSubscriber from "./Subscriber/DebrisSubscriber";
import Status from "./Status";
import { DroneSubscriber, Subscriber, WaypointSubscriber, PortSubscriber} from "./Subscriber";

// Frontend and CSS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import Navbar from "./Components/Navbar";
import NoFlyZone from "./NoFlyZone";

//MQTT CONNECTOR
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const host = 'broker.hivemq.com'
const port = '8000'
const connectUrl = `ws://${host}:${port}/mqtt`
const options = {
  clientId: clientId,
  clean: true,
  connectTimeout: 10000,
  username: "ArkaAerospace",
  password: "@ArkaAerospace",
  reconnectPeriod: 1000,
};

const markersLonLat = mapConfig.dronePorts;
const droneMarkers = mapConfig.drones;
const routeLonLat = mapConfig.currPath;
// const markerSource = new VectorSource({
//    features: new Feature(new Point([0,0])),
// })
var iconStyle = new Style({
   image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
   }),
});

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

function addDroneMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.droneMarker,
      scale: [
        Math.sin((1 * Math.PI) / 180) * 3,
        Math.sin((45 * Math.PI) / 180) / 10,
      ],
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

function addRoute(lonLatArray) {
  var routeStyle = new Style({
    stroke: new Stroke({
      width: 6,
      color: [237, 0, 0, 0.8],
      // TODO: Find a way to get gradient
    }),
  });

  var polyline = new Polyline({
    factor: 1e6,
  }).writeGeometry(new LineString(lonLatArray));

  let feature = new Feature({
    type: "route",
    geometry: new Polyline({ factor: 1e6 }).readGeometry(polyline, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    }),
  });
  feature.setStyle(routeStyle);
  return feature;
}



const App = () => {
   const [center, setCenter] = useState(mapConfig.center);
   const [zoom, setZoom] = useState(23);
   const [OSMsource, setOSMsource] = useState(osm());
   const [LocationVectorSource, setLocationVectorSource] = useState(vector({}));

   const location = useRef();
   const mapRef = useRef();
   useEffect(() => {
      navigator.geolocation.watchPosition(
         (position) => {
            location.current = [
               position.coords.longitude,
               position.coords.latitude,
            ];
         },
         (error) => {
            console.log(error);
         },
         { enableHighAccuracy: true }
      );
   }, []);

  const [showMarker, setShowMarker] = useState(true);
  const [showDrones, setDroneMarker] = useState(true);
  const [showRoute, setRoute] = useState(true);

  const [features, setFeatures] = useState(addMarkers(markersLonLat));
  const [droneFeatures, setDroneFeatures] = useState(
    addDroneMarkers(droneMarkers)
  );
  const [pathFeatures, setPathFeatures] = useState(addRoute(routeLonLat));
  const vectorSource = vector({});

  var allFeatures = features.concat(pathFeatures);
  allFeatures = allFeatures.concat(droneFeatures);

   var polyLine1 = [
      { lat: 32.0899919969712, lng: 34.785847663879395 },
      { lat: 32.089337541416015, lng: 34.79365825653076 },
      { lat: 32.0843926146109, lng: 34.78516101837158 },
      { lat: 32.083301785911715, lng: 34.79151248931885 },
   ];

   return (
      <Connector brokerUrl={connectUrl} options={options}>
         <div>
            <div>
               <Navbar />
               <div style={{ position: "relative", zIndex: "3" }}>
                  <Map center={fromLonLat(center)} zoom={zoom} mapRef={mapRef}>
                     <Layers>
                        <TileLayer source={OSMsource} zIndex={0} />
                        {showMarker && <VectorLayer source={vectorSource} />}
                     </Layers>
                     {/* <VectorLayer source={markerSource} style={iconStyle}/> */}
                     <Controls>
                        <FullScreenControl />
                        {/* <SwarmContext.Provider values={{currSwarmID, setcurrSwarmID, moveSwarm, stopSwarm}}> */}
                           <Status /> //MQTT Connector
                           <SwarmMenu vectorSource={vectorSource}/>
                           <LocateSwarmControl source={vectorSource}/>
                        {/* </SwarmContext.Provider> */}
                     </Controls>

                     <Events>
                        <GetCoordsEvent />
                        <NoFlyZone />
                     </Events>

                     {/* {addRoute(polyLine1)} */}
                     <DroneSubscriber source={vectorSource} />
                     <DebrisSubscriber source={vectorSource} />
                     <PortSubscriber source={vectorSource} />
                     <WaypointSubscriber source={vectorSource} />
                  </Map>
               </div>
            </div>
            
         </div>
      </Connector>
   );
};

export default App;

import React from 'react'
import { transform } from 'ol/proj';
import { VectorLayer } from "./Layers";
import { Style} from "ol/style";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Fill, Circle as CircleStyle} from "ol/style";

// No Fly Zone
const noFlyZone = [
    {
       "latitude": 70,
       "longitude": 71,
       "radius": 100,
    },
    {
       "latitude": 50,
       "longitude": 11,
       "radius": 150,
    },
    {
       "latitude": 15,
       "longitude": 49,
       "radius": 123,
    },
    {
       "latitude": 47,
       "longitude": 58,
       "radius": 90,
    }
 ]
 
 function NoFlyZoneCheck(latitude, longitude) {
 
    const R = 6371; // radius of the Earth in km
    const lat1 = toRadians(latitude);
    const lon1 = toRadians(longitude);
 
    const outside = noFlyZone.map(
       (zone) => {
          const center = transform([zone.longitude, zone.latitude], 'EPSG:4326', 'EPSG:3857')
          const lat2 = toRadians(zone.latitude);
          const lon2 = toRadians(zone.longitude);
 
          const dLat = lat2 - lat1;
          const dLon = lon2 - lon1;
          const a = Math.sin(dLat / 2) * 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * 2;
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
          return distance <= zone.radius;
       }
    )
    console.log(outside);
    const num_zones = outside.filter((value) => value).length
    return num_zones
    // Haversine formula
 }

 // Helper function to convert degrees to radians
function toRadians(degrees) {
    return degrees * Math.PI / 180;
 }
 
 console.log("No FLy Zone check", NoFlyZoneCheck(70.5, 71))
 
 const noFlyZonesMap = noFlyZone.map((zone) => {
    const circleGeoJSON = {
       type: "Feature",
       geometry: {
          type: "Point",
          coordinates: transform([zone.longitude, zone.latitude], 'EPSG:4326', 'EPSG:3857')
       },
       property: {}
    }
    const circleSource = new VectorSource({
       features: new GeoJSON().readFeatures(circleGeoJSON),
    });
    const circleStyle = new Style({
       image: new CircleStyle({
          radius: zone.radius,
          fill: new Fill({
             color: "rgba(255, 0, 0, 0.3)", // Specify the fill color and opacity
          }),
       }),
    });
 
    return [circleSource, circleStyle]
 })

export default function NoFlyZone() {
    let x=0;
    return (
    <>
    {
        
        noFlyZonesMap.map((zone) => {
           // console.log("zone in component", zone[0]);
           return (<VectorLayer key={++x} source={zone[0]} style={zone[1]} />)
        })
    }
    </>
  )
}

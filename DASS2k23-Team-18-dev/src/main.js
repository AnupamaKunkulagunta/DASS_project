import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Map, View, Feature} from 'ol';
import {fromLonLat, transform} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Style, Fill, Icon, Stroke} from 'ol/style';
import mqtt from 'mqtt';
import {Point} from 'ol/geom';

const map = new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: fromLonLat([0, 0]),
    zoom: 2,
  }),
});

const source = new VectorSource();

const basemarker = new Feature({
  geometry: new Point(transform(fromLonLat([0, 0]), 'EPSG:4326', 'EPSG:3857')),
});

source.addFeature(basemarker);

const style = new Style({
  stroke: new Stroke({
    color: 'rgba(0, 0, 255, 0.2)',
  }),
  image: new Icon({
    src: './data/icon.png',
    rotateWithView: true,
  })
})

const layer = new VectorLayer({
  source: source,
  style: style,
})

map.addLayer(layer);

const client = mqtt.connect('ws://localhost:9001');

client.on('connect', () => {
  console.log('connected');

  client.subscribe('drones', (err) => {
    if (err)
      console.log(err);
  });
})

client.on('message', (topic, message) => {
  if (topic === 'drones') {
    const data = JSON.parse(message.toString());
    console.log(data);

    const marker = new Feature({
      geometry: new Point(fromLonLat(data), 'EPSG:4326', 'EPSG:3857'),
    });

    source.addFeature(marker);
    console.log(source.getFeatures());
  }
});

map.on('click', (evt) => {
  const lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
  client.publish('drones', JSON.stringify(lonlat));
})

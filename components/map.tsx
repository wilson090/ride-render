import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; // Import Map type as well


const MapComponent: React.FC<{ mapboxApiKey: string }> = ({ mapboxApiKey }) => {
    useEffect(() => {
    mapboxgl.accessToken = mapboxApiKey;
    console.log(mapboxApiKey)

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/wspearman/clmsnvedp01zo01rc6b84bz6y',
      center: [-122.486052, 37.830348],
      zoom: 14,
    });

    // Create an overlay element
    // const overlay = document.createElement('div');
    // overlay.className = 'h-full flex justify-center items-center'

    // const stats = document.createElement('div');
    // stats.className = 'text-md text-white font-bold absolute bottom-1/4 right-1/4';
    // stats.innerHTML = '20mi 13.2mph';
    // overlay.appendChild(stats);
    // map.getContainer().appendChild(overlay);


    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
                [-122.483696, 37.833818],
                [-122.483482, 37.833174],
                [-122.483396, 37.8327],
                [-122.483568, 37.832056],
                [-122.48404, 37.831141],
                [-122.48404, 37.830497],
                [-122.483482, 37.82992],
                [-122.483568, 37.829548],
                [-122.48507, 37.829446],
                [-122.4861, 37.828802],
                [-122.486958, 37.82931],
                [-122.487001, 37.830802],
                [-122.487516, 37.831683],
                [-122.488031, 37.832158],
                [-122.488889, 37.832971],
                [-122.489876, 37.832632],
                [-122.490434, 37.832937],
                [-122.49125, 37.832429],
                [-122.491636, 37.832564],
                [-122.492237, 37.833378],
                [-122.493782, 37.833683]
            ],
          },
        },
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#FC4C02',
          'line-width': 8,
        },
      });

      map.boxZoom.disable();
      map.scrollZoom.disable();
      map.dragPan.disable();
      map.dragRotate.disable();
      map.keyboard.disable();
      map.doubleClickZoom.disable();
      map.touchZoomRotate.disable();
      
    });
  }, ); // Include mapboxApiKey as a dependency in the useEffect

  return     <div id="map" className="w-full h-full"></div>  ;
};

export default MapComponent;

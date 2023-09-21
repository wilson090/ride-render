import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; // Import Map type as well
import rideData from '../public/example_ride/ride.geojson';

interface MapComponentProps {
  mapboxApiKey: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ mapboxApiKey}) => {
    useEffect(() => {
    mapboxgl.accessToken = mapboxApiKey;
    const geojsonData = JSON.parse(rideData);

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
        data: geojsonData,
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
      
      // Wait for the "route" layer to load
      map.on('data', (e) => {
        if (e.sourceId === 'route' && e.isSourceLoaded) {
          // Get the features from the "route" layer
        const features = map.querySourceFeatures('route');

        if (features.length > 0) {
          // Initialize bounds with the coordinates of the first feature
          const bounds = new mapboxgl.LngLatBounds();

          // Extend the bounds to include all coordinates from all features
          features.forEach((feature) => {
            feature.geometry.coordinates.forEach((coord) => {
              bounds.extend(coord);
            });
          });

          // Fit the map to the calculated bounds
          map.fitBounds(bounds, {
            padding: 75, // You can adjust the padding as needed
          });
        }
  
          // Disable map interactions if needed
          map.boxZoom.disable();
          map.scrollZoom.disable();
          map.dragPan.disable();
          map.dragRotate.disable();
          map.keyboard.disable();
          map.doubleClickZoom.disable();
          map.touchZoomRotate.disable();
        }
      });
      
    });
  }, [mapboxApiKey]);

  return <div id="map" className="w-full h-full"></div>  ;
};

export default MapComponent;

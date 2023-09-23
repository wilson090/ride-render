import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLatBounds } from 'mapbox-gl';

interface MapComponentProps {
  mapboxApiKey: string;
  mapStyleUrl: string;
  geoJsonData: any;
}

function getMidpoint(coord1, coord2): [number, number] {
  return [
    (coord1[0] + coord2[0]) / 2, // Midpoint longitude
    (coord1[1] + coord2[1]) / 2  // Midpoint latitude
  ];
}

const MapComponent: React.FC<MapComponentProps> = ({ mapboxApiKey, mapStyleUrl, geoJsonData }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const [styleLoaded, setStyleLoaded] = useState(false);

  const styleUrlToColorMap = {
    'mapbox://styles/wspearman/clmsnvedp01zo01rc6b84bz6y': 
      {color: '#FC4C02',
       width: 8,
       lineDasharray: [1,0] },
    'mapbox://styles/mapbox/light-v10':
      {color: '#FC4C02',
       width: 8,
       lineDasharray: [1,0] },
    'mapbox://styles/mapbox/streets-v12':
      {color: '#FC4C02',
       width: 8,
       lineDasharray: [1,0] },
    'mapbox://styles/wspearman/clmv38qdg020v01r82fnr56jw':
      {color: '#fff700',
       width: 2,
       lineDasharray: [2,2] },
    'mapbox://styles/wspearman/clmvad3cl006f01py0bcl73yz':
      {color: '#FFFFFF',
       width: 8,
       lineDasharray: [1,0] },
  };

  const centerMap = (geojson) => {
    console.log("center")
    // Create a 'LngLatBounds' with both corners at the first coordinate.
    const bounds = new LngLatBounds();
    
    // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
    geojson.features.forEach((feature) => {
      const geometry = feature.geometry;
      if (geometry.type === 'MultiLineString') {
        geometry.coordinates.forEach((coordinates) => {
          coordinates.forEach((coordinate) => {
            bounds.extend(coordinate);
          });
        });
      } else if (geometry.type === 'LineString') {
        geometry.coordinates.forEach((coordinate) => {
          bounds.extend(coordinate);
        });
      }
    });

    mapInstanceRef.current.fitBounds(bounds, {
      padding: 75
    });
};

  const disableUserMovement = () => {
    // Disable map interactions if needed
    mapInstanceRef.current!.boxZoom.disable();
    mapInstanceRef.current!.scrollZoom.disable();
    mapInstanceRef.current!.dragPan.disable();
    mapInstanceRef.current!.dragRotate.disable();
    mapInstanceRef.current!.keyboard.disable();
    mapInstanceRef.current!.doubleClickZoom.disable();
    mapInstanceRef.current!.touchZoomRotate.disable();
    
  }

  useEffect(() => {
    // Initialize Mapbox GL map when the component mounts
    mapboxgl.accessToken = mapboxApiKey;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/light-v10', // Use a default style while the provided style loads
      center: [-122.486052, 37.830348],
      zoom: 12,
  });

    mapInstanceRef.current = map;

    // Listen for the "style.load" event to ensure the style is loaded
    map.on('style.load', () => {
      setStyleLoaded(true); // Mark the style as loaded

      // Create the initial source with geoJsonData
      if (geoJsonData) {
        map.addSource('route', {
          type: 'geojson',
          data: geoJsonData,
        });

        // Create a layer using the initial source
        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': styleUrlToColorMap[mapStyleUrl].color,
            'line-width':  styleUrlToColorMap[mapStyleUrl].width,
            'line-dasharray':  styleUrlToColorMap[mapStyleUrl].lineDasharray,
          },
        });
        // Center the map around the initial data
        centerMap(geoJsonData);
        disableUserMovement();
      }
    });

    // Cleanup function to remove the map when the component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [mapboxApiKey, geoJsonData]);

  useEffect(() => {
    // Change map style when mapStyleUrl changes
    if (mapInstanceRef.current && mapStyleUrl) {
      mapInstanceRef.current.setStyle(mapStyleUrl);

      mapInstanceRef.current.on('style.load', () => {
        const lineColor = styleUrlToColorMap[mapStyleUrl].color;
        const lineWidth = styleUrlToColorMap[mapStyleUrl].width;
        const lineDasharray = styleUrlToColorMap[mapStyleUrl].lineDasharray;
        mapInstanceRef.current.setPaintProperty('route', 'line-color', lineColor);
        mapInstanceRef.current.setPaintProperty('route', 'line-width', lineWidth);
        mapInstanceRef.current.setPaintProperty('route', 'line-dasharray', lineDasharray);
      });
    }
  }, [mapStyleUrl, geoJsonData]);

  return (
    <div ref={mapContainerRef} className='w-full h-full'/>
  );
};

export default MapComponent;

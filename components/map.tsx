import React, { useEffect, useRef } from 'react';
import mapboxgl, { LngLatBounds } from 'mapbox-gl';

interface MapComponentProps {
  mapboxApiKey: string;
  mapStyleUrl: string;
  geoJsonData: any;
}

const MapComponent: React.FC<MapComponentProps> = ({ mapboxApiKey, mapStyleUrl, geoJsonData }) => {
  const mapContainerRef = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const routeSource = useRef<string | null>('route');
  const prevStyle = useRef(mapStyleUrl);

  useEffect(() => {
    mapboxgl.accessToken = mapboxApiKey;

    if (!map.current) {
      // Initialize the map when it's not already initialized
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: mapStyleUrl, // Set the initial map style
        center: [-122.486052, 37.830348],
        zoom: 12,
      });
      prevStyle.current = mapStyleUrl

      // Wait for the new style to load
      map.current.on('style.load', () => {
        // Add the route source after the style has loaded
        map.current!.addSource(routeSource.current!, {
          type: 'geojson',
          data: geoJsonData,
        });

        // Add the route layer
        map.current!.addLayer({
          id: 'route',
          type: 'line',
          source: routeSource.current!,
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
        map.current!.on('data', (e) => {
          if (e.sourceId === routeSource.current! && e.isSourceLoaded) {
            // Get the features from the "route" layer
            const features = map.current!.querySourceFeatures(routeSource.current!);

            if (features.length > 0) {
              // Initialize bounds with the coordinates of the first feature
              const bounds = new LngLatBounds();

              // Extend the bounds to include all coordinates from all features
              features.forEach((feature) => {
                feature.geometry.coordinates.forEach((coord) => {
                  bounds.extend(coord);
                });
              });

              // Fit the map to the calculated bounds
              map.current!.fitBounds(bounds, {
                padding: 75,
              });
            }

            // Disable map interactions if needed
            map.current!.boxZoom.disable();
            map.current!.scrollZoom.disable();
            map.current!.dragPan.disable();
            map.current!.dragRotate.disable();
            map.current!.keyboard.disable();
            map.current!.doubleClickZoom.disable();
            map.current!.touchZoomRotate.disable();
          }
        });
      });
    } else {
      // Update the data of the "route" source when geoJsonData changes
      if (mapStyleUrl !== prevStyle.current) {
        map.current.setStyle(mapStyleUrl);
        prevStyle.current = mapStyleUrl

      } else {
        map.current.getSource(routeSource.current!)!.setData(geoJsonData);
      }
    }
  }, [mapboxApiKey, mapStyleUrl, geoJsonData]);

  return <div id="map" className="w-full h-full" ref={mapContainerRef}></div>;
};

export default MapComponent;

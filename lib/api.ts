import togeojson from '@mapbox/togeojson';
const DOMParser = require('xmldom').DOMParser;

// Function to convert GPX to GeoJSON and return GeoJSON string
export function convertGpxDataToGeoJson(gpxData) {
    // Parse the GPX data
    const gpxParser = new DOMParser();
    const gpxDoc = gpxParser.parseFromString(gpxData, 'text/xml');
  
    // Convert GPX to GeoJSON
    const geojson = togeojson.gpx(gpxDoc);
  
    // Return the GeoJSON as a string
    return JSON.stringify(geojson, null, 2);
  }  
import { updateDatabaseWithGeoJSONDataFromOverpass } from "./updateDatabaseWithGeoJSONDataFromOverpass.ts";
import osmtogeojson from "osmtogeojson";
import axios from "axios";

/**
 * Retrieves parks data from OpenStreetMap based on the provided latitude, longitude, and radius.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} The response object containing the parks data.
 */
export const getParksOSM = async (req, res) => {
    try {
      const { lat = 45.5231, lon = -122.6765, radius = 50000 } = req.query;
  
      if (!lat || !lon || !radius) {
        res.status(400).send({ message: "Invalid request parameters" });
        return; // Return early to avoid further execution
      }
  
      const overpassUrl = process.env.OSM_URI;
  
      const overpassQuery = `
        [out:json][timeout:25];
        (
          way["leisure"~"park|nature_reserve|garden|recreation_ground"](around:${radius},${lat},${lon});
        );
        (._;>;);
        out tags geom qt;
        `;
  
      const response = await axios.post(overpassUrl, overpassQuery, {
        headers: { "Content-Type": "text/plain" },
      });
  
      const geojsonData = osmtogeojson(response.data);
      console.log("geojsonData==============", geojsonData);
  
      updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);
  
      res.send(geojsonData);
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Error retrieving Parks OSM results" });
    }
  };
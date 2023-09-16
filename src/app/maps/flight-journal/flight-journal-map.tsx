"use client";

import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import EsriConfig from "@arcgis/core/config";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import CSVLayer from "@arcgis/core/layers/CSVLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Search from "@arcgis/core/widgets/Search";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import * as projection from "@arcgis/core/geometry/projection";
import dynamic from "next/dynamic";

let searchWidget: Search;
let view: MapView;
let fetchAirportSuggestions;

const FlightJournalMap = ({ departingFlightPath }) => {
  const mapRef = useRef(null);

  EsriConfig.apiKey = process.env.ARCGIS_API_KEY || "";

  const map = new Map({
    //basemap: "dark-gray-vector",
    basemap: "streets-vector",
  });

  useEffect(() => {
    // Dynamically import the function when component is mounted on client side
    import("./fetch-airport-suggestions").then((module) => {
      fetchAirportSuggestions = module.fetchAirportSuggestions;
    });
  }, []);

  const flightPathRenderer = new SimpleRenderer({
    symbol: {
      //@ts-ignore
      type: "simple-line",
      color: [180, 7, 242], // Orange color for the line
      width: 4,
    },
  });

  // Add polyline layer for flight paths
  const flightPathLayer = new GraphicsLayer({
    title: "Flight Paths",
  });

  const newFlightPathLayer = new GraphicsLayer({
    title: "New Flight Paths",
    visible: true,
    //@ts-ignore
    renderer: flightPathRenderer,
  });

  // Define the symbol for airports
  const airportSymbol = new SimpleMarkerSymbol({
    color: [180, 7, 242], // Orange color for the marker
    size: 8,
    outline: {
      color: [255, 255, 255], // White outline
      width: 4,
    },
  });

  // Apply the symbol using a simple renderer
  const renderer = new SimpleRenderer({
    symbol: airportSymbol,
  });

  const url = "/airports.csv";

  const airportsLayer = new CSVLayer({
    url: url,
    title: "Airports",
    renderer: renderer, // Set the renderer to the CSVLayer
    visible: false,
  });

  searchWidget = new Search({
    view: view,
    sources: [
      {
        //@ts-ignore
        layer: airportsLayer,
        searchFields: ["name", "iata_code"],
        suggestionTemplate: "{name} ({iata_code})",
      },
    ],
  });

  //Sample polyline (flight path)
  // const flightPath = new Polyline({
  //   hasZ: false,
  //   hasM: false,
  //   paths: [
  //     [
  //       [-12643680.009443998, 7040494.491956076],
  //       [-13712205.300028155, 6308033.068273641],
  //     ],
  //   ],
  //   spatialReference: { wkid: 3857 },
  // });

  // const geodesicFlightPath = geometryEngine.geodesicDensify(flightPath, 10000); // the second parameter is maxSegmentLength

  // const flightPathGraphic = new Graphic({
  //   geometry: geodesicFlightPath,
  //   symbol: {
  //     //@ts-ignore
  //     type: "simple-line",
  //     color: [180, 7, 242], // Orange color for the line
  //     width: 4,
  //   },
  // });

  //flightPathLayer.add(flightPathGraphic);

  const getAirportCoordinates = async (airportName: string) => {
    // Extract the IATA code from the airport name. This assumes the format is "Name (IATA)"
    const iataMatch = airportName.match(/\(([^)]+)\)/);
    if (!iataMatch) {
      throw new Error(`Invalid airport name format: ${airportName}`);
    }
    const iataCode = iataMatch[1];

    // Define the query parameters
    const query = airportsLayer.createQuery();
    query.where = `iata_code = '${iataCode}'`;
    query.outFields = ["*"]; // Get all fields
    query.returnGeometry = true; // Return the geometry of the feature

    try {
      const results = await airportsLayer.queryFeatures(query);
      if (results.features.length > 0) {
        console.log(results.features[0].geometry.toJSON());
        return results.features[0].geometry;
      } else {
        throw new Error(`No coordinates found for airport: ${airportName}`);
      }
    } catch (error) {
      console.error("Failed to fetch coordinates:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (departingFlightPath) {
      (async () => {
        try {
          const pathCoordinates = [];

          for (const flightSegment of departingFlightPath) {
            if (flightSegment.origin) {
              const originGeometry = await getAirportCoordinates(
                flightSegment.origin
              );
              pathCoordinates.push([originGeometry.x, originGeometry.y]);
            }
            if (flightSegment.layovers) {
              const layoverGeometriesList = await Promise.all(
                flightSegment.layovers.map((layover: string) =>
                  getAirportCoordinates(layover)
                )
              );
              for (const geometry of layoverGeometriesList) {
                pathCoordinates.push([geometry.x, geometry.y]);
              }
            }
            if (flightSegment.destination) {
              const destinationGeometry = await getAirportCoordinates(
                flightSegment.destination
              );
              pathCoordinates.push([
                destinationGeometry.x,
                destinationGeometry.y,
              ]);
            }
          }

          if (pathCoordinates.length > 0) {
            const flightPath = new Polyline({
              hasZ: false,
              hasM: false,
              paths: pathCoordinates,
              spatialReference: { wkid: 4326 },
            });

            // Convert the flight path's spatial reference to the view's spatial reference
            const projectedFlightPath = projection.project(
              flightPath,
              view.spatialReference
            ) as Polyline;
            const geodesicFlightPath = geometryEngine.geodesicDensify(
              projectedFlightPath,
              10000
            );

            console.log(geodesicFlightPath.toJSON());

            const flightPathGraphic = new Graphic({
              geometry: geodesicFlightPath,
              symbol: {
                //@ts-ignore
                type: "simple-line",
                color: [226, 119, 40],
                width: 4,
              },
            });

            flightPathLayer.graphics.add(flightPathGraphic);
          }
        } catch (error) {
          console.error("Failed to generate flight path:", error);
        }
      })();
    }
  }, [departingFlightPath, view]);

  useEffect(() => {
    if (mapRef.current) {
      view = new MapView({
        map: map,
        container: mapRef.current,
        zoom: 3,
        center: [-96.76, 34.56],
      });
      view.when(() => {
        map.addMany([newFlightPathLayer, flightPathLayer, airportsLayer]);
        console.log(view.spatialReference.wkid);
      });
    }
  }, [mapRef]);

  return <div ref={mapRef} className="w-full h-full"></div>;
};

export default FlightJournalMap;

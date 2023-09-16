"use client";

import Search from "@arcgis/core/widgets/Search";
import CSVLayer from "@arcgis/core/layers/CSVLayer";

const url = "/airports.csv";

const airportsLayer = new CSVLayer({
    url: url,
    title: "Airports",
    visible: false
  });

let searchWidget = new Search({
    sources: [
      {
        //@ts-ignore
        layer: airportsLayer,
        searchFields: ["name", "iata_code"],
        suggestionTemplate: "{name} ({iata_code})"
      }
    ]
  });
  
  export const fetchAirportSuggestions = async (input: string | undefined) => {
    const suggestions = await searchWidget.suggest(input);
    const suggestionArray = suggestions?.results.map((suggestion) => suggestion?.results.map((s) => s.text));
    return suggestionArray || null;
  };
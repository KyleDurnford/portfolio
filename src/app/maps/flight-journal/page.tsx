//@ts-nocheck
"use client";

import "../../globals.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const FlightJournalMap = dynamic(() => import("./flight-journal-map"), {
  ssr: false,
});

const FlightJournal = () => {
  const [fetchAirportSuggestions, setFetchAirportSuggestions] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [focusedField, setFocusedField] = useState(null);
  const [layovers, setLayovers] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [departingFlightPath, setDepartingFlightPath] = useState([
    { origin: null },
    { layovers: null },
    { destination: null },
  ]);
  const [inputForSuggestions, setInputForSuggestions] = useState("");
  const focusTimeoutRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    import("./fetch-airport-suggestions").then((module) => {
      if (isMounted) {
        setFetchAirportSuggestions(() => module.fetchAirportSuggestions);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchSuggestions = useCallback(
    async (input: any) => {
      if (!fetchAirportSuggestions) return;
      const newSuggestions = await fetchAirportSuggestions(input);
      if (newSuggestions) {
        console.log(newSuggestions);
        setSuggestions(newSuggestions[1]);
      }
    },
    [fetchAirportSuggestions]
  );

  useEffect(() => {
    if (inputForSuggestions) {
      fetchSuggestions(inputForSuggestions);
    }
  }, [inputForSuggestions, fetchSuggestions]);

  const handleInputFocus = (field) => {
    setFocusedField(field);
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    focusTimeoutRef.current = setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleInputChange = async (e: { target: { value: any } }, field) => {
    const input = e.target.value;
    if (field === "origin") setOrigin(input);
    else if (field === "destination") setDestination(input);
    else if (field.startsWith("layover-")) {
      const index = parseInt(field.split("-")[1], 10);
      const newLayovers = [...layovers];
      newLayovers[index] = input;
      setLayovers(newLayovers);
    }
    setInputForSuggestions(input);
  };

  const addLayover = () => {
    setLayovers((prevLayovers) => [...prevLayovers, ""]);
  };

  const removeLayover = (indexToRemove: number) => {
    setLayovers((prevLayovers) =>
      prevLayovers.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleNextStep = () => {
    setDepartingFlightPath([
      { origin: origin },
      { layovers: layovers },
      { destination: destination },
    ]);
  };

  const handleSuggestionClick = (suggestion: string, field: string) => {
    if (field === "origin") setOrigin(suggestion || "");
    else if (field === "destination") setDestination(suggestion || "");
    else if (field.startsWith("layover-")) {
      const index = parseInt(field.split("-")[1], 10);
      const newLayovers = [...layovers];
      newLayovers[index] = suggestion || "";
      setLayovers(newLayovers);
    }
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
    }
    setShowSuggestions(false);
  };

  return (
    <section className="flex">
      <div className="basis-4/5 w-full h-screen">
        <FlightJournalMap
          departingFlightPath={departingFlightPath}
        ></FlightJournalMap>
      </div>
      <form className="basis-1/5 w-full h-full text-white p-4">
        <h2 className="font-bold text-2xl mb-4">Create a New Trip 📔</h2>

        {/* Origin input and suggestions */}
        <div>
          <label className="font-bold text-lg mb-2">Origin Airport</label>
          <input
            type="text"
            className="border border-neutral-700 bg-neutral-800 rounded p-2 w-full"
            onChange={(e) => handleInputChange(e, "origin")}
            placeholder="City Name or Airport Code"
            value={origin}
            onFocus={() => handleInputFocus("origin")}
            onBlur={handleInputBlur}
          />
          {focusedField === "origin" && showSuggestions && (
            <ul className="flex flex-col rounded cursor-pointer">
              {suggestions?.map((suggestion, i) => (
                <li
                  onClick={() => handleSuggestionClick(suggestion, "origin")}
                  className="border border-neutral-700 bg-neutral-800 p-2 hover:bg-neutral-600"
                  key={i}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Layovers input and suggestions */}
        {layovers.map((layover, index) => (
          <div key={index} className="mt-4">
            <div className="flex justify-between mb-2">
              <label className="font-bold text-lg">
                Layover Airport {index + 1}
              </label>
              <button
                type="button"
                className="text-red-600"
                onClick={() => removeLayover(index)}
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              className="border border-neutral-700 bg-neutral-800 rounded p-2 w-full"
              onChange={(e) => handleInputChange(e, `layover-${index}`)}
              value={layover}
              onFocus={() => handleInputFocus(`layover-${index}`)}
              onBlur={handleInputBlur}
              placeholder="City Name or Airport Code"
            />
            {focusedField === `layover-${index}` && showSuggestions && (
              <ul className="flex flex-col rounded cursor-pointer">
                {suggestions?.map((suggestion, i) => (
                  <li
                    onClick={() =>
                      handleSuggestionClick(suggestion, `layover-${index}`)
                    }
                    className="border border-neutral-700 bg-neutral-800 p-2 hover:bg-neutral-600"
                    key={i}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Button to add a new Layover field */}
        <div>
          <button type="button" className=" text-blue-600" onClick={addLayover}>
            + Add Layover Airport
          </button>
        </div>

        {/* Destination input and suggestions */}
        <div className="mt-4">
          <label className="font-bold text-lg mb-2">Destination Airport</label>
          <input
            type="text"
            className="border border-neutral-700 bg-neutral-800 rounded p-2 w-full"
            onChange={(e) => handleInputChange(e, "destination")}
            value={destination}
            onFocus={() => handleInputFocus("destination")}
            onBlur={handleInputBlur}
            placeholder="City Name or Airport Code"
          />
          {focusedField === "destination" && showSuggestions && (
            <ul className="flex flex-col rounded cursor-pointer">
              {suggestions?.map((suggestion, i) => (
                <li
                  onClick={() =>
                    handleSuggestionClick(suggestion, "destination")
                  }
                  className="border border-neutral-700 bg-neutral-800 p-2 hover:bg-neutral-600"
                  key={i}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="button" onClick={handleNextStep}>
          Next {">"}
        </button>
      </form>
    </section>
  );
};

export default FlightJournal;

// src/context/LocationContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import locationsData from "./../../local-json/locations.json";

type Location = {
  id: number;
  country: string;
  city: string;
  position: [number, number];
  description: string;
  url: string;
};

type LocationContextType = {
  locations: Location[];
  filteredLocations: Location[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectLocation: (id: number) => void;
  selectedLocation?: Location;
  resetMapView: () => void;
  handleSelectSuggestion: (location: Location) => void;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  filterLocations: (search: string) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Custom hook to use LocationContext
export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  }
  return context;
};

// LocationProvider component
export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locations] = useState<Location[]>(locationsData.Locations as Location[]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >();
  const [isActive, setIsActive] = useState(true);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  // Filter locations based on search query
  const filterLocations = (searchlocation: string) => {
    console.log(searchlocation, "searchQuery");
    setFilteredLocations(
      locations.filter(
        (location) =>
          location.city
            .toLowerCase()
            .startsWith(searchlocation.toLowerCase()) ||
          location.country
            .toLowerCase()
            .startsWith(searchlocation.toLowerCase())
      )
    );
  };

  const selectLocation = (id: number) => {
    const location = locations.find((loc) => loc.id === id);
    setSelectedLocation(location);
  };

  const resetMapView = () => {
    setSelectedLocation(undefined); // Unselect the current location to reset view
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (location: Location) => {
    setSearchQuery(location.city); // Set the selected suggestion in the input field
    setIsActive(false);
    selectLocation(location.id);
  };
  return (
    <LocationContext.Provider
      value={{
        locations,
        filteredLocations,
        searchQuery,
        setSearchQuery,
        selectedLocation,
        selectLocation,
        resetMapView,
        handleSelectSuggestion,
        isActive,
        setIsActive,
        filterLocations,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

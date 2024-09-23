import React from "react";
import { useLocationContext } from "../../utilities/contexts/LocationContext";
import { IoSearch, IoClose, IoArrowBack } from "react-icons/io5";

// Define the type for the location data

const SearchBar = () => {
  const {
    searchQuery,
    filteredLocations,
    isActive,
    setSearchQuery,
    setIsActive,
    resetMapView,
    filterLocations,

    handleSelectSuggestion,
  } = useLocationContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsActive(true);
    filterLocations(e.target.value);
  };

  const clearInput = () => {
    setSearchQuery("");
  };

  return (
    <div>
      <div className="row p-0">
        <div className="col-sm-1 cursor" onClick={resetMapView}>
          <IoArrowBack size={20} />
        </div>
        <div className="col-sm-10 title">
          <center>
            <h5>S-MAPS</h5>
          </center>
        </div>
      </div>
      <div className="search-container">
        <div className="searchbar">
          <input
            className="searchbar-input"
            type="text"
            placeholder="Search for a location"
            value={searchQuery}
            onChange={handleInputChange}
          />
          {searchQuery.length === 0 ? (
            <IoSearch size={20} color="#6D6D6D" />
          ) : (
            <IoClose size={20} color="#6D6D6D" onClick={clearInput} />
          )}
        </div>
        {searchQuery.length > 0 &&
          isActive &&
          (filteredLocations.length > 0 ? (
            <ul className="suggestions-list">
              {filteredLocations.map((location, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleSelectSuggestion(location);
                  }}
                  className="suggestion-item">
                  {location.city} , {location.country}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="suggestions-list">
              <li className="suggestion-item">No data found</li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;

import React from "react";
import { useLocationContext } from "../../utilities/contexts/LocationContext";

const Sidebar = () => {
  const { locations, selectLocation } = useLocationContext();
  return (
    <div className="sidebar">
      <ul>
        {locations.map((location) => (
          <li key={location.id} onClick={() => selectLocation(location.id)}>
            <span>{location.city}</span>
            <span className="country-title"> - {location.country}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

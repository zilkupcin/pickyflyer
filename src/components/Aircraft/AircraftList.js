import React from "react";
import AircraftItem from "./AircraftItem";

const AircraftList = ({ aircraft, onSelectAircraft }) => {
  return (
    <ul className="aircraft-list">
      {aircraft.map(aircraft => {
        return (
          <AircraftItem
            aircraft={aircraft}
            onSelectAircraft={onSelectAircraft}
            key={aircraft.id}
          />
        );
      })}
    </ul>
  );
};

export default AircraftList;

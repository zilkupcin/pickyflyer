import React from "react";
import FlightItem from "./FlightItem";
const FlightList = ({ flights, onFlightSearch, date, isQueryComplete }) => {
  return (
    <ul className="flight-list">
      {flights.map(flight => {
        return (
          <FlightItem
            date={date}
            flight={flight}
            onFlightSearch={onFlightSearch}
            key={flight.id}
          />
        );
      })}
    </ul>
  );
};

export default FlightList;

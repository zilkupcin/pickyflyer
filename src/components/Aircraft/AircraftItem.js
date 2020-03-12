import React from "react";
import { withRouter } from "react-router";
import Fade from "react-reveal/Fade";

const AircraftItem = withRouter(({ history, aircraft, onSelectAircraft }) => {
  const aircraftImageStyle = {
    background: `url(${aircraft.photo})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <Fade bottom duration={1000}>
      <li
        className="aircraft-list__item"
        onClick={() => onSelectAircraft(aircraft.id, history)}
      >
        <div className="aircraft-card">
          <div
            style={aircraftImageStyle}
            className="aircraft-card__image"
            alt="aircraft"
          />
          <div className="aircraft-card__details">
            <h5 className="aircraft-card__model">{aircraft.model}</h5>
            <div className="aircraft-card__info">
              <span className="aircraft-card__info-tag">
                {aircraft.flights} Flights
              </span>
              <span className="aircraft-card__info-tag">
                {aircraft.airlines} Airlines
              </span>
            </div>
          </div>
        </div>
      </li>
    </Fade>
  );
});

export default AircraftItem;

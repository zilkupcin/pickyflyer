import React from "react";
import { ReactComponent as ArrowRight } from "../../images/arrow_right.svg";
import Fade from "react-reveal/Fade";

const FlightItem = ({ flight, onFlightSearch, date }) => {
  const buildSearchUrl = url => {
    if (url) return url;
    return `https://www.momondo.co.uk/flight-search/${flight.origin}-${flight.destination}/${date}?sort=price_a&fs=stops=~0`;
  };

  const buildAirlineLogo = () => {
    return `http://pics.avs.io/200/200/${flight.flightNumber.substring(
      0,
      2
    )}.png`;
  };

  const FlightSearchButton = ({ price }) => {
    return price ? (
      <button
        className="btn-outline flight__price"
        onClick={() => onFlightSearch(buildSearchUrl(flight.url))}
      >
        {price.includes("-1") ? "Search" : price}
      </button>
    ) : (
      <button
        className="btn-outline flight__price"
        onClick={() => onFlightSearch(buildSearchUrl(flight.url))}
      >
        Search
      </button>
    );
  };

  return (
    <Fade bottom duration={500}>
      <li className="flight-item">
        <div className="flight">
          <img
            className="flight__airline-logo"
            src={flight.airlineLogo ? flight.airlineLogo : buildAirlineLogo()}
            alt="airline logo"
          />
          <div className="flight__info-group flight__airline">
            <span className="flight__info-heading">Airline</span>
            <h5>{flight.airline}</h5>
          </div>
          <div className="flight__info-group--row flight__route">
            <div className="flight__info-group">
              <span className="flight__info-heading">From</span>
              <h5>{flight.origin}</h5>
            </div>
            <ArrowRight className="flight__arrow-img" />
            <div className="flight__info-group">
              <span className="flight__info-heading">To</span>
              <h5>{flight.destination}</h5>
            </div>
          </div>
          <div className="flight__info-group flight__number">
            <span className="flight__info-heading">Flight number</span>
            <h5>{flight.flightNumber}</h5>
          </div>
          <div className="flight__info-group flight__aircraft">
            <span className="flight__info-heading">Aircraft</span>
            <h5>{flight.aircraftName}</h5>
          </div>
          <div className="flight__info-group--row flight__times">
            <div className="flight__info-group">
              <span className="flight__info-heading">Leaves</span>
              <h5>{flight.departureTime ? flight.departureTime : "-"}</h5>
            </div>
            <ArrowRight className="flight__arrow-img" />
            <div className="flight__info-group">
              <span className="flight__info-heading">Arrives</span>
              <h5>{flight.arrivalTime ? flight.arrivalTime : "-"}</h5>
            </div>
          </div>
          <FlightSearchButton price={flight.price} />
        </div>
      </li>
    </Fade>
  );
};

export default FlightItem;

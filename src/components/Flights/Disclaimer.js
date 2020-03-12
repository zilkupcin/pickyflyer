import React from "react";

const Disclaimer = ({ flights }) => {
  const showDisclaimer = flights.find(flight => flight.price === undefined);

  if (!showDisclaimer) return null;

  return (
    <div className="notice">
      <img
        className="notice__icon"
        src={require("../../images/notice.png")}
        alt="disclaimer"
      />
      <h1 className="notice__content">
        Couldn't find prices and times for some or all flights. Clicking
        'Search' will lead to Momondo flight search
      </h1>
    </div>
  );
};

export default Disclaimer;

import React from "react";

const Home = () => {
  return (
    <div className="home wrapper">
      <div className="home__card">
        <h3 className="card__heading">About Us</h3>
        <p className="card__content">
          If you wish to fly on a specific aircraft, matching an airline, route
          and a date can be a tedious process. We make that process much easier
          by finding flights that match your choice of aircraft.
          <br />
          <br />
          We also show you all the routes a specific aircraft flies so you can
          plan your next trip and enjoy the flight on an aircraft you like!
        </p>
      </div>
      <div className="home__card">
        <h3 className="card__heading">Our Features</h3>
        <ul className="feature-list">
          <li>Details of 102 000 Flights</li>
          <li>Search by 190 different aircraft types</li>
          <li>Flights from 200 airports</li>
          <li>Flight price search</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

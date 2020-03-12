import React, { useState } from "react";
import SearchForm from "./SearchForm";
import airports from "../../data/airports";
import { formatDate, getDefaultDepartureDate } from "../../utils/dateUtils";

const Search = () => {
  const defaultDepartureAirport = {
    name: "London Heathrow Airport",
    code: "LHR"
  };

  const defaultArrivalAirport = {
    name: "Amsterdam Schiphol Airport",
    code: "AMS"
  };

  const [dropdowns, setDropdowns] = useState({});
  const [departureAirport, setDepartureAirport] = useState(
    defaultDepartureAirport
  );
  const [arrivalAirport, setArrivalAirport] = useState(defaultArrivalAirport);
  const [departureDate, setDepartureDate] = useState(getDefaultDepartureDate());
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [departureSelected, setDepartureSelected] = useState(true);
  const [arrivalSelected, setArrivalSelected] = useState(true);
  const [error, setError] = useState("");

  const handleSearch = history => {
    setError("");

    if (!departureSelected) {
      setError("Please select a departure airport");
      return;
    }

    if (!arrivalSelected) {
      setError("Please select an arrival airport");
      return;
    }

    let destination = arrivalAirport.code ? arrivalAirport.code : "any";
    history.push(
      `/search/${departureAirport.code}/${destination}/${formatDate(
        departureDate
      )}`
    );
  };

  const handleDeleteCharacter = (type, value) => {
    //If arrival airport is empty, 'any' airport is selected
    if (type === "arrivalAirport" && value === "") {
      setArrivalSelected(true);
    }
    // Reset selected airport
    type === "departureAirport"
      ? departureAirport.code && setDepartureAirport({ name: "" })
      : arrivalAirport.code && setArrivalAirport({ name: value });
  };

  const handleDateChange = date => {
    setDepartureDate(date);
  };

  const handleInputChange = e => {
    let value = e.target.value;
    let inputName = e.target.name;

    //If nothing is entered in the input field, hide the dropdown, show otherwise
    value !== ""
      ? setDropdowns({ [inputName]: true })
      : setDropdowns({ [inputName]: false });

    if (inputName === "departureAirport") {
      setDepartureSelected(false);
      departureAirport.name.length > value.length &&
        handleDeleteCharacter(inputName, value);
    } else {
      setArrivalSelected(false);
      arrivalAirport.name.length > value.length &&
        handleDeleteCharacter(inputName, value);
    }

    // Find airports that match the query
    filterAirports(value, inputName);

    // Set airport state
    inputName === "departureAirport" && setDepartureAirport({ name: value });
    inputName === "arrivalAirport" && setArrivalAirport({ name: value });

    //Check if entered query already matches a valid airport
    findMatchByInput(e);
  };

  const handleAirportSelect = selection => {
    selection.type === "departureAirport"
      ? setDepartureAirport(selection)
      : setArrivalAirport(selection);
  };

  const findMatchBySelection = selection => {
    let inputName = selection.inputName;
    let value = selection.value;

    let foundAirport = airports.find(airport => airport.code === value);

    if (foundAirport) {
      handleAirportSelect({ type: inputName, airport: foundAirport });

      if (inputName === "departureAirport") {
        setDepartureAirport(foundAirport);
        setDepartureSelected(true);
      }

      if (inputName === "arrivalAirport") {
        setArrivalSelected(true);
        setArrivalAirport(foundAirport);
      }
    }
  };

  const findMatchByInput = e => {
    let value = e.target.value;
    let inputName = e.target.name;
    let foundAirport = airports.find(
      airport => airport.name.toLowerCase() === value.toLowerCase()
    );

    if (foundAirport) {
      handleAirportSelect({ type: inputName, airport: foundAirport });

      if (inputName === "departureAirport") setDepartureSelected(true);
    }
  };

  const filterAirports = (value, name) => {
    //Find 6 airports that match the query
    const filteredAirports = airports
      .filter(airport => {
        return airport.name.toLowerCase().startsWith(value.toLowerCase());
      })
      .splice(0, 6);

    setFilteredAirports(filteredAirports);

    // If no matches were found, hide dropdowns
    if (filteredAirports.length === 0) setDropdowns({ [name]: false });
  };

  const handleItemSelect = e => {
    findMatchBySelection(e);
  };

  const handleBlur = e => {
    setDropdowns({ [e.target.name]: false });
  };

  const handleInputClick = e => {
    e.target.value !== "" && setDropdowns({ [e.target.name]: true });
    e.target.value !== "" && filterAirports(e.target.value, e.target.name);
  };

  return (
    <section className="head">
      <div className="wrapper">
        <div className="search">
          <h2 className="search__heading">
            Let's find you the perfect aircraft to fly on!
          </h2>
          <SearchForm
            airports={airports}
            onAirportSelect={handleAirportSelect}
            departureDate={departureDate}
            onDateChange={handleDateChange}
            arrivalAirport={arrivalAirport.name}
            departureAirport={departureAirport.name}
            onChange={handleInputChange}
            dropdowns={dropdowns}
            onBlur={handleBlur}
            onInputClick={handleInputClick}
            onItemSelect={handleItemSelect}
            onSearch={handleSearch}
            error={error}
            filteredAirports={filteredAirports}
          />
        </div>
      </div>
    </section>
  );
};

export default Search;

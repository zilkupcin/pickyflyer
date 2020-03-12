import React, { useEffect } from "react";
import { useState } from "react";
import ContentHeader from "../ContentHeader";
import FlightList from "./FlightList";
import Pagination from "../Pagination";
import Loader from "../Loader";
import Error from "../Error";
import { createSkyscannerSession, querySession } from "../../api/skyscanner";
import { mergeFlightResults } from "../../utils/jsonUtils";
import Disclaimer from "./Disclaimer";
import { SEARCH_MODES } from "../../constants";
import { getDayOfTheWeek, getReverseDate } from "../../utils/dateUtils";
import {
  fetchFlightsByQuery,
  getFlightCountByQuery,
  getFlightCountByAircraft,
  fetchFlightsByAircraft
} from "../../api/parseCloud";

const Flights = ({ match, currency }) => {
  const searchMode = match.path.includes("search")
    ? SEARCH_MODES.BY_QUERY
    : SEARCH_MODES.BY_AIRCRAFT;

  const origin = match.params.departure;
  const destination = match.params.arrival;
  const date = match.params.date;
  const aircraftId = match.params.aircraft;

  //Check if all query parameters are present
  const isQueryComplete =
    origin &&
    origin !== "any" &&
    destination &&
    destination !== "any" &&
    date &&
    true;

  const resultsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [flights, setFlights] = useState([]);
  const [flightCount, setFlightCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsFetching(true);
    if (searchMode === SEARCH_MODES.BY_QUERY) {
      fetchByQuery();
    } else {
      fetchByAircraft();
    }
  }, [currency]);

  const fetchByQuery = async () => {
    const queryParams = {
      queryLimit: resultsPerPage,
      skipCount: resultsPerPage * currentPage - resultsPerPage,
      flightOrigin: origin,
      flightDestination:
        !destination || destination === "any" ? undefined : destination,
      flightDay: getDayOfTheWeek(date),
      aircraftId: aircraftId ? aircraftId : undefined
    };

    try {
      if (isQueryComplete) {
        //Search for flights in the databse and query the Skyscanner API later to match flights with their prices
        const results = await fetchFlightsByQuery(queryParams);
        searchFlights(results);
      } else {
        //Search for flights in the database only.
        const count = await getFlightCountByQuery(queryParams);
        setFlightCount(count);

        const results = await fetchFlightsByQuery(queryParams);
        setFlights(results);
        setIsFetching(false);
      }
    } catch (e) {
      setErrorMessage(e);
    }
  };

  const searchFlights = async flights => {
    //Query the skyscanner API, match them with flights from the database and display them
    try {
      const reversedDate = getReverseDate(date);
      const sessionKey = await createSkyscannerSession(
        currency,
        origin,
        destination,
        reversedDate
      );
      const skyscannerFlights = await querySession(sessionKey, 0);
      flights = mergeFlightResults(skyscannerFlights, flights, currency);
      setIsFetching(false);
      setFlightCount(flights.length);
      setFlights(flights);
    } catch (e) {
      setErrorMessage(e);
    }
  };

  const fetchByAircraft = async () => {
    //Query flights by specific aircraft
    const queryParams = {
      aircraftId: aircraftId ? aircraftId : undefined,
      queryLimit: resultsPerPage,
      skipCount: resultsPerPage * currentPage - resultsPerPage
    };

    try {
      const count = await getFlightCountByAircraft(queryParams);
      setFlightCount(count);

      const results = await fetchFlightsByAircraft(queryParams);
      setFlights(results);
      setIsFetching(false);
    } catch (e) {
      setErrorMessage(e);
    }
  };

  const handlePageChange = type => {
    type === "next"
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage - 1);
    setIsFetching(true);
    searchMode === SEARCH_MODES.BY_QUERY ? fetchByQuery() : fetchByAircraft();
  };

  const handleFlightSearch = url => {
    window.open(url, "_blank");
  };

  if (isFetching) {
    return (
      <div className="content wrapper--wide">
        <Loader />
      </div>
    );
  }

  if (flights.length === 0)
    return <Error message="Unfortunately, no results could be found" />;

  if (errorMessage !== "") {
    return <Error message={errorMessage} />;
  }

  return (
    <div className="content wrapper--wide">
      <ContentHeader
        pageType={"flight"}
        results={isQueryComplete ? flights.length : flightCount}
      />
      <Disclaimer flights={flights} />
      <FlightList
        date={getReverseDate(date)}
        onFlightSearch={handleFlightSearch}
        isQueryComplete={isQueryComplete}
        flights={
          isQueryComplete
            ? flights.filter((flight, index) => {
                return (
                  index < resultsPerPage * currentPage &&
                  index >= resultsPerPage * currentPage - resultsPerPage
                );
              })
            : flights
        }
      />
      <Pagination
        currentPage={currentPage}
        pageCount={Math.ceil(flightCount / resultsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Flights;

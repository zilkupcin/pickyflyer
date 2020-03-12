import React, { useLayoutEffect } from "react";
import ContentHeader from "../ContentHeader";
import AircraftList from "./AircraftList";
import { useState } from "react";
import Pagination from "../Pagination";
import Loader from "../Loader";
import Error from "../Error";
import { getDayOfTheWeek } from "../../utils/dateUtils";
import { SEARCH_MODES } from "../../constants";
import { fetchAllAircraft, fetchAircraftByQuery } from "../../api/parseCloud";

const Aircraft = ({ match }) => {
  const searchMode = match.path.includes("search")
    ? SEARCH_MODES.BY_QUERY
    : SEARCH_MODES.BY_AIRCRAFT;

  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [aircraftList, setAircraftList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useLayoutEffect(() => {
    setIsFetching(true);
    if (searchMode === SEARCH_MODES.BY_QUERY) {
      fetchByQuery();
    } else {
      fetchAll();
    }
  }, [match.url]);

  const fetchAll = async () => {
    try {
      const results = await fetchAllAircraft();
      setAircraftList(results);
      setIsFetching(false);
    } catch (e) {
      setErrorMessage(e);
    }
  };

  const fetchByQuery = async () => {
    let origin = match.params.departure;
    let destination = match.params.arrival;
    let date = match.params.date;

    const queryParams = {
      flightOrigin: origin,
      flightDestination:
        !destination || destination === "any" ? undefined : destination,
      flightDay: getDayOfTheWeek(date)
    };

    try {
      const results = await fetchAircraftByQuery(queryParams);
      setAircraftList(results);
      setIsFetching(false);
    } catch (e) {
      setErrorMessage(e);
    }
  };

  const handleSelectAircraft = (id, history) => {
    searchMode === SEARCH_MODES.BY_AIRCRAFT
      ? history.push(`/aircraft/${id}`)
      : history.push(
          `/search/${match.params.departure}/${match.params.arrival}/${match.params.date}/${id}`
        );
  };

  const handlePageChange = type => {
    window.scrollTo(0, 0);
    type === "next"
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage - 1);
  };

  if (isFetching) return <Loader />;

  if (aircraftList.length === 0)
    return <Error message="Unfortunately, no results could be found" />;

  if (errorMessage !== "") {
    return <Error message={errorMessage} />;
  }

  return (
    <div className="content wrapper--wide">
      <React.Fragment>
        <ContentHeader pageType="aircraft" results={aircraftList.length} />
        <AircraftList
          aircraft={aircraftList.filter((aircraft, index) => {
            return (
              index < resultsPerPage * currentPage &&
              index >= resultsPerPage * currentPage - resultsPerPage
            );
          })}
          onSelectAircraft={handleSelectAircraft}
        />
        <Pagination
          currentPage={currentPage}
          pageCount={Math.ceil(aircraftList.length / resultsPerPage)}
          onPageChange={handlePageChange}
        />
      </React.Fragment>
    </div>
  );
};

export default Aircraft;

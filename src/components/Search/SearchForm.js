import React from "react";
import { withRouter } from "react-router";
import { ReactComponent as CalendarImg } from "../../images/calendar.svg";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "react-datepicker/node_modules/date-fns/locale/en-GB";
import AirportSelector from "../AirportSelector";
registerLocale("en-GB", enGB);

const SearchForm = ({
  departureDate,
  onDateChange,
  arrivalAirport,
  departureAirport,
  onChange,
  onBlur,
  onInputClick,
  onItemSelect,
  onSearch,
  error,
  filteredAirports,
  dropdowns
}) => {
  const SearchButton = withRouter(({ history }) => {
    return (
      <button className="btn-main" onClick={() => onSearch(history)}>
        Search
      </button>
    );
  });

  return (
    <React.Fragment>
      <div className="search__content">
        <div className="search__content__group">
          <div className="input-group">
            <AirportSelector
              isActive={dropdowns.departureAirport}
              onBlur={onBlur}
              onInputClick={onInputClick}
              onItemSelect={onItemSelect}
              onChange={onChange}
              inputValue={departureAirport}
              filteredAirports={filteredAirports}
              inputName="departureAirport"
              inputPlaceholder="From"
            />
            <AirportSelector
              isActive={dropdowns.arrivalAirport}
              onBlur={onBlur}
              onInputClick={onInputClick}
              onItemSelect={onItemSelect}
              onChange={onChange}
              inputValue={arrivalAirport}
              filteredAirports={filteredAirports}
              inputName="arrivalAirport"
              inputPlaceholder="Anywhere"
            />
            <div className="input-container">
              <CalendarImg className={"input-container__icon"} />
              <DatePicker
                selected={departureDate}
                onChange={onDateChange}
                locale="en-GB"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </div>
        <SearchButton />
      </div>
      {error !== "" && <span className="input-error">{error}</span>}
    </React.Fragment>
  );
};

export default SearchForm;

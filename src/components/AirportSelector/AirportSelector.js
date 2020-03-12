import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import { ReactComponent as PinImg } from "../../images/pin.svg";

const AirportSelector = ({
  isActive,
  onBlur,
  onChange,
  onInputClick,
  inputValue,
  filteredAirports,
  onItemSelect,
  inputName,
  inputPlaceholder
}) => {
  return (
    <div
      className={
        isActive
          ? "input-container input-container--is-active"
          : "input-container"
      }
    >
      <PinImg className={"input-container__icon"} />
      <input
        type="text"
        name={inputName}
        placeholder={inputPlaceholder}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onInputClick}
        value={inputValue}
      />
      <Dropdown
        items={filteredAirports}
        onItemClick={onItemSelect}
        inputName={inputName}
        isActive={isActive}
      />
    </div>
  );
};

export default AirportSelector;

import React, { useEffect, useState, useRef } from "react";
import { ReactComponent as ArrowDown } from "../../images/arrow_down.svg";
import { ReactComponent as ArrowUp } from "../../images/arrow_up.svg";

const CurrencySelector = ({ onCurrencyChange, currency, isMobile }) => {
  const [isActive, setIsActive] = useState(false);
  const [currencies, setCurrencies] = useState(["USD", "AUD", "EUR", "CAD"]);

  const dropdownNode = useRef();

  const handleCurrencyClick = e => {
    setIsActive(false);
    const clickedCurrency = e.target.innerText;
    //Place current currency back into the array
    const selectedCurrencyIndex = currencies.indexOf(
      currencies.find(currency => currency === clickedCurrency)
    );
    const currenciesCopy = [...currencies];
    currenciesCopy[selectedCurrencyIndex] = currency;
    setCurrencies(currenciesCopy);

    onCurrencyChange(clickedCurrency);
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleClickOutside = e => {
    if (dropdownNode.current.contains(e.target)) {
      return;
    }

    setIsActive(false);
  };

  const getArrow = () => {
    return isActive ? (
      <ArrowUp className="currency-selector__arrow" />
    ) : (
      <ArrowDown className="currency-selector__arrow" />
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={handleClick}
      className={
        isActive
          ? `${
              isMobile ? "currency-selector--mobile" : "currency-selector"
            } currency-selector--is-active`
          : `${isMobile ? "currency-selector--mobile" : "currency-selector"}`
      }
      ref={dropdownNode}
    >
      {!isMobile && getArrow()}

      <span className="currency">{currency}</span>
      <ul className={isActive ? "dropdown dropdown--is-active" : "dropdown"}>
        {currencies.map(currency => {
          return (
            <li
              className="dropdown__item"
              key={currency}
              onClick={handleCurrencyClick}
            >
              {currency}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CurrencySelector;

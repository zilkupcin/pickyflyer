import React from "react";

const ContentHeader = ({ pageType, results }) => {
  const getPageHeading = () => {
    switch (pageType) {
      case "aircraft":
        return "Choose an aircraft";
      case "flight":
        return "Flights";
      default:
        return "";
    }
  };

  const getResultsText = () => {
    let type;
    switch (pageType) {
      case "aircraft":
        type = "Aircraft";
        break;
      case "flight":
        type = "Flights";
        break;
      default:
        type = "";
        break;
    }
    return `• ${results} ${type} found`;
  };

  return (
    <div className="content__header">
      <h4 className="content__header__title">{getPageHeading()}</h4>
      <span className="content__header__result-count">{getResultsText()}</span>
    </div>
  );
};

export default ContentHeader;

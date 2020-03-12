import React from "react";
import { ReactComponent as ErrorImg } from "../../images/error.svg";

const Error = ({ message }) => {
  return (
    <div className="error">
      <ErrorImg className={"error__image"} />
      <h5>{message}</h5>
    </div>
  );
};

export default Error;

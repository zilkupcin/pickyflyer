import React from "react";

const Loader = ({ willTakeLong }) => {
  return (
    <div className="loader">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
      {willTakeLong && <span>This can take up to 10 seconds</span>}
    </div>
  );
};

export default Loader;

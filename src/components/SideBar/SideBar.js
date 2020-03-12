import React from "react";
import Nav from "../Header/Nav";
import { ReactComponent as CloseImage } from "../../images/close.svg";
import CurrencySelector from "../Header/CurrencySelector";

const SideBar = ({
  sidebarOpen,
  onSidebarCose,
  onCurrencyChange,
  currency
}) => {
  return (
    <div className={sidebarOpen ? "side-bar side-bar--open" : "side-bar"}>
      <CloseImage className="side-bar__close" onClick={onSidebarCose} />
      <span className="side-bar__section-heading">Menu</span>
      <Nav isMobile="true" />
      <span className="side-bar__section-heading">Currency</span>
      <CurrencySelector
        onCurrencyChange={onCurrencyChange}
        currency={currency}
        isMobile={true}
      />
    </div>
  );
};

export default SideBar;

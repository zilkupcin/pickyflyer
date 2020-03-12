import React from "react";
import Nav from "./Nav";
import CurrencySelector from "../Header/CurrencySelector";
import SiteInfo from "./SiteInfo";
import { ReactComponent as MenuImg } from "../../images/menu.svg";

const Header = ({ onCurrencyChange, currency, onMenuClick, isFixed }) => {
  return (
    <header className={isFixed ? "header fixed" : "header"}>
      <div className="header__section--left">
        <SiteInfo />
      </div>
      <Nav />
      <MenuImg className="mobile-hamburger" onClick={onMenuClick} />
      <CurrencySelector
        onCurrencyChange={onCurrencyChange}
        currency={currency}
      />
    </header>
  );
};

export default Header;

import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ isMobile }) => {
  return (
    <div className={isMobile ? "nav-mobile" : "nav"}>
      <NavLink
        to="/"
        exact
        className={isMobile ? "nav-mobile__link" : "nav__link"}
        activeClassName={
          isMobile ? "nav-mobile__link--selected" : "nav__link--selected"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/aircraft"
        className={isMobile ? "nav-mobile__link" : "nav__link"}
        activeClassName={
          isMobile ? "nav-mobile__link--selected" : "nav__link--selected"
        }
      >
        All aircraft
      </NavLink>
      <NavLink
        to="/contact"
        className={isMobile ? "nav-mobile__link" : "nav__link"}
        activeClassName={
          isMobile ? "nav-mobile__link--selected" : "nav__link--selected"
        }
      >
        Contact us
      </NavLink>
    </div>
  );
};

export default Nav;

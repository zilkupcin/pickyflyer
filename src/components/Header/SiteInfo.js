import React from "react";
import SiteLogo from "../../images/logo.png";
import { withRouter } from "react-router";

const SiteInfo = withRouter(({ history }) => {
  return (
    <div className="site-info" onClick={() => history.push("/")}>
      <img className="site-info__logo" src={SiteLogo} alt="logo" />
      <h1 className="site-info__name">Picky Flyer</h1>
    </div>
  );
});

export default SiteInfo;

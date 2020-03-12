import React, { useEffect, Suspense } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Search from "./components/Search/Search";
import { useState } from "react";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Loader from "./components/Loader/Loader";

const Home = React.lazy(() => import("./components/Home"));
const ContactUs = React.lazy(() => import("./components/ContactUs"));
const Flights = React.lazy(() => import("./components/Flights"));
const Aircraft = React.lazy(() => import("./components/Aircraft"));

function App() {
  const [currency, setCurrency] = useState("GBP");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const pageScrolled = window.scrollY > 0;
    if (pageScrolled) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  };

  const handleCurrencyChange = newCurrency => {
    currency !== newCurrency && setCurrency(newCurrency);
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <Header
          onCurrencyChange={handleCurrencyChange}
          currency={currency}
          onMenuClick={handleMenuClick}
          isFixed={headerFixed}
        />
        <SideBar
          sidebarOpen={sidebarOpen}
          onSidebarCose={handleSidebarClose}
          onCurrencyChange={handleCurrencyChange}
          currency={currency}
        />
        <Search />
        <main>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/" component={Home} />
              {/* All aircraft */}
              <Route path="/aircraft" exact component={Aircraft} />
              {/* Contact us */}
              <Route path="/contact" exact component={ContactUs} />
              {/* Aircraft selection */}
              <Route
                path="/search/:departure/:arrival/:date"
                exact
                component={Aircraft}
              />
              {/* Flight Search */}
              <Route
                path="/search/:departure/:arrival/:date/:aircraft"
                exact
                render={routeProps => (
                  <Flights {...routeProps} currency={currency} />
                )}
              />
              {/* All Flights with the aircraft */}
              <Route
                path="/aircraft/:aircraft"
                exact
                render={routeProps => (
                  <Flights {...routeProps} currency={currency} />
                )}
              />
            </Switch>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

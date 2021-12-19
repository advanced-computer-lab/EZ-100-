import React, { useContext } from "react";

import { Layout } from "./Components/Layout/Layout";
import NewFlight from "./Pages/NewFlight";
import EditUser from "./Pages/User/EditUser";
import { LoginPage } from "./Pages/Auth/LoginPage";
import ReservationProvider from "./store/ReservationProvider";

import { AllFlightsWrapper } from "./Components/Flights/AllFlightsWrapper";
import { FlightDetails } from "./Pages/FlightDetails";
import { Home } from "./Pages/Home";
import { SearchTrip } from "./Pages/User/SearchTrip";

import { Route, Switch, Redirect } from "react-router-dom";
import { SearchResults } from "./Pages/User/SearchResults";
import { ViewReservedFlights } from "./Pages/ViewReservedFlights";

import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {/* <Home></Home> */}
          <Redirect to="/search" />
        </Route>
        {isLoggedIn && (
          <Route path="/home">
            <Home></Home>
          </Route>
        )}
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        {isLoggedIn && (
          <Route path="/new-flight">
            <NewFlight></NewFlight>
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/flights" exact>
            <AllFlightsWrapper></AllFlightsWrapper>
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/flights/:flightId">
            <FlightDetails></FlightDetails>
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/edit-user">
            <EditUser></EditUser>
          </Route>
        )}
        <Route path="/search">
          <SearchTrip></SearchTrip>
        </Route>
        <Route path="/results/select">
          <ReservationProvider>
            <SearchResults></SearchResults>
          </ReservationProvider>
        </Route>
        {isLoggedIn && (
          <Route path="/reservation">
            <ViewReservedFlights></ViewReservedFlights>
          </Route>
        )}

        {/* Anchor page (404 page or anything) */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

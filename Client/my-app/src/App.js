import React, { useContext } from "react";

import { Layout } from "./Components/Layout/Layout";
import NewFlight from "./Pages/NewFlight";
import EditUser from "./Pages/User/EditUser";
import Signup from "./Components/User/Account/Signup";
import { LoginPage } from "./Pages/Auth/LoginPage";
import ReservationProvider from "./store/ReservationProvider";

import { AllFlightsWrapper } from "./Components/Flights/AllFlightsWrapper";
import { FlightDetails } from "./Pages/FlightDetails";
// import { Home } from "./Pages/Home";
import { SearchTrip } from "./Pages/User/SearchTrip";

import { Route, Switch, Redirect } from "react-router-dom";
import { SearchResults } from "./Pages/User/SearchResults";
import { ViewReservedFlights } from "./Pages/ViewReservedFlights";

import AuthContext from "./store/auth-context";
import { PaymentSuccess } from "./Components/Payment/PaymentSuccess";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  // const role = authCtx.user.role;
  let role = "user";
  if (authCtx.user) {
    role = authCtx.user.role;
  }

  return (
    <Layout>
      <Switch>
        <Route path="/payment-success">
          <PaymentSuccess></PaymentSuccess>
        </Route>

        <Route path="/" exact>
          {/* <Home></Home> */}
          <Redirect to="/search" />
        </Route>

        {isLoggedIn && role === "user" && (
          <Route path="/home">
            {/* <Home></Home> */}
            <Redirect to="/search" />
          </Route>
        )}

        {isLoggedIn && role === "admin" && (
          <Route path="/home">
            {/* <Home></Home> */}
            <Redirect to="/flights" />
          </Route>
        )}

        <Route path="/login">
          <LoginPage nextPage="/home"></LoginPage>
        </Route>
        {isLoggedIn && (
          <Route path="/new-flight">
            <NewFlight></NewFlight>
          </Route>
        )}
        {isLoggedIn && role === "admin" && (
          <Route path="/flights" exact>
            <AllFlightsWrapper></AllFlightsWrapper>
          </Route>
        )}
        {isLoggedIn && role === "admin" && (
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
        <Route path="/register">
          <Signup> </Signup>
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

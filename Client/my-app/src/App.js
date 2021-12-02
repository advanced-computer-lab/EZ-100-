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

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {/* <Home></Home> */}
          <Redirect to="/search" />
        </Route>

        <Route path="/home">
          <Home></Home>
        </Route>

        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>

        <Route path="/new-flight">
          <NewFlight></NewFlight>
        </Route>

        <Route path="/flights" exact>
          <AllFlightsWrapper></AllFlightsWrapper>
        </Route>

        <Route path="/flights/:flightId">
          <FlightDetails></FlightDetails>
        </Route>
        <Route path="/edit-user">
          <EditUser></EditUser>
        </Route>
        <Route path="/search">
          <SearchTrip></SearchTrip>
        </Route>

        <Route path="/results/select">
          <ReservationProvider>
            <SearchResults></SearchResults>
          </ReservationProvider>
        </Route>
        <Route path="/reservation">
          <ViewReservedFlights></ViewReservedFlights>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

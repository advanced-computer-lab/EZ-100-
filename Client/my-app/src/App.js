import { Layout } from "./Components/Layout/Layout";

import NewFlight from "./Pages/NewFlight";

import ReservationProvider from "./store/ReservationProvider";

import { AllFlightsWrapper } from "./Components/Flights/AllFlightsWrapper";
import { FlightDetails } from "./Pages/FlightDetails";
import { Home } from "./Pages/Home";
import { SearchTrip } from "./Pages/User/SearchTrip";

import { Route, Switch } from "react-router-dom";
import { SearchResults } from "./Pages/User/SearchResults";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home></Home>
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

        <Route path="/search">
          <SearchTrip></SearchTrip>
        </Route>

        <Route path="/results/select">
          <ReservationProvider>
            <SearchResults></SearchResults>
          </ReservationProvider>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

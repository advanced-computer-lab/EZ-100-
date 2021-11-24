import { Layout } from "./Components/Layout/Layout";

import NewFlight from "./Pages/NewFlight";

// import { AllFlights } from "./Pages/AllFlights";
import { AllFlightsWrapper } from "./Components/Flights/AllFlightsWrapper";
import { FlightDetails } from "./Pages/FlightDetails";
import { Home } from "./Pages/Home";

import { Route, Switch } from "react-router-dom";

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
      </Switch>
    </Layout>
  );
}

export default App;

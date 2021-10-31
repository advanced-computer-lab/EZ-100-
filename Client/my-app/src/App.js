import { Layout } from "./Components/Layout/Layout";
import { NewFlight } from "./Pages/NewFlight";
import { AllFlights } from "./Pages/AllFlights";
import { FlightDetails } from "./Pages/FlightDetails";

import { Route } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Route path="/new-flight">
        <NewFlight></NewFlight>
      </Route>

      <Route path="/flights" exact>
        <AllFlights></AllFlights>
      </Route>

      <Route path="/flights/flightId">
        <FlightDetails></FlightDetails>
      </Route>
    </Layout>
  );
}

export default App;

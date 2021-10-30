import { Layout } from "./Components/Layout/Layout";
import { NewFlight } from "./Pages/NewFlight";
import { AllFlights } from "./Pages/AllFlights";

import { Route } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Route path="/new-flight">
        <NewFlight></NewFlight>
      </Route>

      <Route path="/all-flights">
        <AllFlights></AllFlights>
      </Route>
    </Layout>
  );
}

export default App;

import { Layout } from "./Components/Layout/Layout";
import { NewFlight } from "./Pages/NewFlight";

import { Route } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Route path="/new-flight">
        <NewFlight></NewFlight>
      </Route>
    </Layout>
  );
}

export default App;

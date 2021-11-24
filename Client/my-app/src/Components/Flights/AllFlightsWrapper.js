import React, { useCallback, useEffect, useState } from "react";

import { AllFlights } from "../../Pages/AllFlights";

export const AllFlightsWrapper = () => {
  const [allFlights, setAllFlights] = useState([]);

  const fetchFlights = useCallback(async () => {
    const response = await fetch(
      "http://localhost:5000/api/flights/viewFlights"
    );
    const data = await response.json();
    setAllFlights(data.data);

    console.log("Filter fetched Flights");
  }, []);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  return <AllFlights allFlights={allFlights}></AllFlights>;
};

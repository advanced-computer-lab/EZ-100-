import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { SearchForm } from "../../Components/User/Flights/SearchForm";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";

import skyBG from "../../assets/sky4.jpg";

export const SearchTrip = () => {
  const [allFlights, setAllFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const historyState = history.location.state;

  // console.log(historyState);

  const fetchFlights = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      "http://localhost:5000/api/flights/viewFlights"
    );
    const data = await response.json();
    setAllFlights(data.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  const formDataHandler = (data) => {
    console.log(data);
    history.push({
      pathname: "/results/select",
      state: { data, searchState: historyState },
    });
  };

  if (!isLoading) {
    return (
      <div
        style={{
          backgroundImage: `url(${skyBG})`,
          height: "960px",
          width: "100%",
        }}
      >
        <SearchForm
          searchState={historyState}
          onFormSubmission={formDataHandler}
          allFlights={allFlights}
        ></SearchForm>
      </div>
    );
  }
  return (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );
};

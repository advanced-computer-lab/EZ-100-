import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { UserFlights } from "../../Components/User/Flights/UserFlights";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import { ItemHeader } from "../../Components/User/Flights/ItemHeader";

import useHttp from "../../hooks/use-http";
import { getRoundTrip } from "../../lib/api";

export const SearchResults = () => {
  const history = useHistory();
  const historyState = history.location.state;

  const { sendRequest, status, data } = useHttp(getRoundTrip, true);

  let departureFlights;
  let returnFlights;
  if (data) {
    departureFlights = data.departureFlights;
    returnFlights = data.returnFlights;
    console.log(data);
  }

  useEffect(() => {
    sendRequest(historyState);
  }, [sendRequest, historyState]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {/* <div style={{ marginBottom: "-2rem" }} className="centered">
        <h3>
          {historyState.fromValue} TO {historyState.toValue}
        </h3>
      </div> */}
      <div className="centered">
        <ItemHeader
          title="Departure"
          from={historyState.fromValue}
          to={historyState.toValue}
        />
      </div>
      <div className="centered">
        <UserFlights flights={departureFlights}></UserFlights>
      </div>
      <hr></hr>
      <div className="centered">
        <ItemHeader
          title="Return"
          from={historyState.toValue}
          to={historyState.fromValue}
        />
      </div>
      <div className="centered">
        <UserFlights flights={returnFlights}></UserFlights>
      </div>
    </>
  );
};

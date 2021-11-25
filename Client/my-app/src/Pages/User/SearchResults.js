import React from "react";
import { useHistory } from "react-router-dom";

export const SearchResults = (props) => {
  const history = useHistory();
  const historyState = history.location.state;

  return <h1>{historyState.departureDate}</h1>;
};

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import { createReservation } from "../../lib/api";

export const PaymentSuccess = () => {
  const pendingReservation = JSON.parse(
    localStorage.getItem("pendingReservation")
  );

  const history = useHistory();
  const { sendRequest, status } = useHttp(createReservation);

  useEffect(() => {
    if (status === null) {
      sendRequest(pendingReservation);
    }

    if (status === "completed") {
      history.replace("/reservation");
      localStorage.removeItem("pendingReservation");
    }
  }, [status, history, pendingReservation, sendRequest]);

  return <div className="centered"></div>;
};

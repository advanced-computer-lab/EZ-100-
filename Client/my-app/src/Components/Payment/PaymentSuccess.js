import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import { createReservation, editReservation } from "../../lib/api";

export const PaymentSuccess = () => {
  const pendingReservation = JSON.parse(
    localStorage.getItem("pendingReservation")
  );

  const history = useHistory();
  const { sendRequest, status } = useHttp(createReservation);
  const { sendRequest: changeReservation, status: status2 } =
    useHttp(editReservation);

  useEffect(() => {
    if (status === null && status2 === null) {
      if (pendingReservation.isEditing) {
        const { reservationId } = pendingReservation;
        changeReservation({
          id: reservationId,
          editedReservation: pendingReservation,
        });
      } else {
        sendRequest(pendingReservation);
      }
    }

    if (status === "completed" || status2 === "completed") {
      history.replace("/reservation");
      localStorage.removeItem("pendingReservation");
    }
  }, [
    status,
    history,
    pendingReservation,
    sendRequest,
    status2,
    changeReservation,
  ]);

  return <div className="centered"></div>;
};

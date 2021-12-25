import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

import AuthContext from "../../../store/auth-context";
import classes from "./AccordionItem.module.css";
import FlightCard from "./FlightCard";

export const AccordionItem = (props) => {
  const [loading, setLoading] = React.useState(false);
  const authCtx = React.useContext(AuthContext);
  const token = authCtx.token;

  const reservation = props.reservation;
  console.log(reservation);

  const { From, To } = reservation.departureFlight;

  const onCancelHandler = () => {
    props.onCancel(reservation._id);
  };

  const onEmailSummaryHandler = async () => {
    setLoading(true);
    await fetch(
      `http://localhost:5000/api/reservations/email_me/${reservation._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);
  };

  return (
    <div className={classes.item}>
      <Accordion sx={{ backgroundColor: "#e1f5fe" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.title}>
            <div className={classes.col}>
              <h3 style={{ marginBottom: "0" }}>
                {From} - {To} (Round trip)
              </h3>
              <p>Booking id: {reservation._id}</p>
            </div>
            <div className={classes["actions-row"]}>
              <button type="button" className="btn" onClick={onCancelHandler}>
                Cancel reservation
              </button>
              <LoadingButton
                // style={{ backgroundColor: "#01579b" }}
                onClick={onEmailSummaryHandler}
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                Email summary
              </LoadingButton>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.row}>
            <FlightCard
              image="dubai"
              flight={reservation.departureFlight}
              isDeparture={true}
              otherFlightDate={reservation.arrivalFlight.DepartureDate}
              reservation={reservation}
              seats={reservation.departureSeats}
              cabin={reservation.cabin}
            ></FlightCard>

            <FlightCard
              flight={reservation.arrivalFlight}
              isDeparture={false}
              otherFlightDate={reservation.departureFlight.DepartureDate}
              reservation={reservation}
              seats={reservation.arrivalSeats}
              cabin={reservation.cabin}
            ></FlightCard>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

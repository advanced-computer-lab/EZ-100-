import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import classes from "./AccordionItem.module.css";

export const AccordionItem = (props) => {
  const reservation = props.reservation;
  console.log(reservation);
  //   let departureDate = new Date(reservation.departureFlight.DepartureDate);
  //   let arrivalDate = new Date(reservation.departureFlight.ArrivalDate);

  //   let departureDate2 = new Date(reservation.arrivalFlight.DepartureDate);
  //   let arrivalDate2 = new Date(reservation.arrivalFlight.ArrivalDate);

  //   const options = {
  //     year: "numeric",
  //     month: "numeric",
  //     day: "numeric",
  //   };

  //   departureDate = {
  //     time: departureDate.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //     longDate: departureDate.toLocaleDateString("en-US", options),
  //   };

  //   arrivalDate = {
  //     longDate: arrivalDate.toLocaleDateString("en-US", options),
  //     time: arrivalDate.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //   };

  //   departureDate2 = {
  //     time: departureDate2.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //     longDate: departureDate2.toLocaleDateString("en-US", options),
  //   };

  //   arrivalDate2 = {
  //     longDate: arrivalDate2.toLocaleDateString("en-US", options),
  //     time: arrivalDate2.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //   };

  //   let temp;
  //   let cabin;
  //   let depPrice;
  //   let returnPrice;
  //   if (reservation.cabin === "Economy") {
  //     temp = "E";
  //     cabin = "Economy";
  //     depPrice = reservation.departureFlight.EconomyPrice;
  //     returnPrice = reservation.arrivalFlight.EconomyPrice;
  //   } else if (reservation.cabin === "Business") {
  //     temp = "B";
  //     cabin = "Business";
  //     depPrice = reservation.departureFlight.BusinessPrice;
  //     returnPrice = reservation.arrivalFlight.BusinessPrice;
  //   } else {
  //     temp = "F";
  //     cabin = "First class";
  //     depPrice = reservation.departureFlight.FirstPrice;
  //     returnPrice = reservation.arrivalFlight.FirstPrice;
  //   }
  //   let depSeats = [];
  //   let returnSeats = [];
  //   for (const seat of reservation.departureSeats) {
  //     depSeats.push(temp + seat);
  //   }

  //   for (const seat of reservation.arrivalSeats) {
  //     returnSeats.push(temp + seat);
  //   }

  const { From, To } = reservation.departureFlight;

  const onCancelHandler = () => {
    props.onCancel(reservation._id);
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
            <h3>
              {From} - {To} (Round trip)
            </h3>
            <button type="button" className="btn" onClick={onCancelHandler}>
              Cancel reservation
            </button>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
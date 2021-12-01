import React from "react";
import classes from "./FlightItem.module.css";

import { Link } from "react-router-dom";
import { PlaneIcon } from "./PlaneIcon";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";

export const FlightItem = (props) => {
  const flight = props.flight;

  let departureDate = new Date(flight.DepartureDate);
  let arrivalDate = new Date(flight.ArrivalDate);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const departure = {
    time: departureDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    longDate: departureDate.toLocaleDateString("en-US", options),
  };

  const arrival = {
    longDate: arrivalDate.toLocaleDateString("en-US", options),
    time: arrivalDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
  return (
    <li className={classes.item}>
      <div className={classes.container}>
        <div className={classes.title}>
          <p>{flight.FlightNumber}</p>
        </div>

        <div className={classes.description}>
          <div className={classes["row-item"]}>
            <label>From</label>
            <div className={classes.content}>{flight.From}</div>
          </div>

          <div className={classes.icon}>
            <PlaneIcon />
          </div>

          <div className={classes["row-item"]}>
            <label>To</label>
            <div className={classes.content}>{flight.To}</div>
          </div>
          <div className={classes["row-item"]}>
            <label>
              Depart <FaPlaneDeparture />
            </label>
            <div className={classes.content}>{departure.time}</div>
            <div>{departure.longDate}</div>
          </div>

          <div className={classes["row-item"]}>
            <label>
              Arrive <FaPlaneArrival />
            </label>
            <div className={classes.content}>{arrival.time}</div>
            <div>{departure.longDate}</div>
          </div>
        </div>
      </div>

      <Link to={`/flights/${flight._id}`} className="btn">
        Options
      </Link>
    </li>
  );
};

// return (
//   <li className={classes.item}>
//     <div className={classes.information}>
//       <div className={classes.title}>
//         <p>Flight {flight.FlightNumber}</p>
//       </div>
//       <div className={classes.description}>
//         <p>
//           <b>Departure:</b> {flight.From} on {departure.date} at{" "}
//           {departure.time}
//         </p>
//         <p>
//           <b>Arrival:</b> {flight.To} on {arrival.date} at {arrival.time}
//         </p>
//       </div>
//     </div>

//     <Link to={`/flights/${flight._id}`} className="btn">
//       Flight Details
//     </Link>
//   </li>
// );

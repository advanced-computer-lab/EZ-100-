import React from "react";
import { useHistory } from "react-router-dom";

import classes from "./UserFlightItem.module.css";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { MdEventSeat, MdOutlinePriceChange } from "react-icons/md";
import { IoBagSharp } from "react-icons/io5";

export const UserFlightItem = (props) => {
  const { flight } = props;
  const history = useHistory();
  const trip = history.location.state;

  let departureDate = new Date(flight.DepartureDate);
  let arrivalDate = new Date(flight.ArrivalDate);

  //   const diffTime = Math.abs(arrivalDate - departureDate); // duration in milliseconds
  //   const duration = diffTime / (1000 * 60 * 60); // duration in hours

  const duration = Math.abs(arrivalDate - departureDate) / 36e5;
  console.log({ arrivalDate, departureDate });

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
      <div>
        <div className={classes.title}>
          <p>{flight.FlightNumber}</p>
        </div>

        <div className={classes.description}>
          <div>
            <label>
              Depart <FaPlaneDeparture />
            </label>
            <div className={classes.content}>{departure.time}</div>
            <div>{departure.longDate}</div>
          </div>

          <div>
            <label>
              Arrive <FaPlaneArrival />
            </label>
            <div className={classes.content}>{arrival.time}</div>
            <div>{departure.longDate}</div>
          </div>

          <div>
            <label>
              Duration <GiSandsOfTime />
            </label>
            <div className={classes.content}>{duration} Hrs</div>
          </div>

          <div>
            <label>
              Cabin <MdEventSeat />
            </label>
            <div className={classes.content}>{trip.cabin}</div>
          </div>

          <div>
            <label>
              Baggage allowance <IoBagSharp />
            </label>
            <div className={classes.content}>10 kg</div>
          </div>

          <div>
            <label>
              Price <MdOutlinePriceChange />
            </label>
            <div className={classes.content}>$450</div>
          </div>
        </div>
      </div>

      <button className="btn">Book</button>
    </li>
  );
};

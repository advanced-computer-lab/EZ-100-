import classes from "./ReservationItem.module.css";
import Card from "../../UI/Card";
import { useState } from "react";
export const ReservationItem = (props) => {
  
    const reservation = props.reservation;
  
    function CancelReservationHandler() {
        props.onCancel(reservation._id);

  }

  




  return (
    <div className={classes.flexContainer}>
      {reservation.FlightNumber}
      <div className={classes.flexContained}>
        <Card>
          <div className={classes.flexContained1}>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Flight Number</label>
                <div className={classes.flexContained1}>EZ-100</div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Departure Date</label>
                <div className={classes.flexContained1}>24/10/2021</div>
              </div>
              <div className={classes.content}>
                <label>Arrival Date </label>
                <div className={classes.flexContained1}>25/10/2021</div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Cabin</label>
                <div className={classes.flexContained1}>Economy</div>
              </div>
              <div className={classes.content}>
                <label>Seats</label>
                <div className={classes.flexContained1}>A1</div>
              </div>
              <div className={classes.content}>
                <label>Price</label>
                <div className={classes.flexContained1}>450$ </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Allowed Baggage</label>
                <div className={classes.flexContained1}>25kg</div>
              </div>
              <div className={classes.content}>
                <label>Terminal</label>
                <div className={classes.flexContained1}>2</div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>From</label>
                <div className={classes.flexContained1}>Cairo</div>
              </div>
              <div className={classes.content}>
                <label>To</label>
                <div className={classes.flexContained1}>London</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className={classes.flexContained}>
        <Card>
          <div className={classes.flexContained1}>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Flight Number</label>
                <div className={classes.flexContained1}>EZ-101</div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Departure Date</label>
                <div className={classes.flexContained1}>1/11/2021</div>
              </div>
              <div className={classes.content}>
                <label>Arrivale Date </label>
                <div className={classes.flexContained1}>3/11/2021</div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Cabin</label>
                <div className={classes.flexContained1}>Economy</div>
              </div>
              <div className={classes.content}>
                <label>Seats</label>
                <div className={classes.flexContained1}>D1</div>
              </div>
              <div className={classes.content}>
                <label>Price</label>
                <div className={classes.flexContained1}>450$ </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Allowed Baggage</label>
                <div className={classes.flexContained1}>25kg</div>
              </div>
              <div className={classes.content}>
                <label>Terminal</label>
                <div className={classes.flexContained1}>1</div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>From</label>
                <div className={classes.flexContained1}>London</div>
              </div>
              <div className={classes.content}>
                <label>To</label>
                <div className={classes.flexContained1}>Cairo</div>
              </div>
            </div>
          </div>
        </Card>
        <div id={classes.button}>
          <button className={classes.btn} onClick={CancelReservationHandler}>
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
    
  );
};

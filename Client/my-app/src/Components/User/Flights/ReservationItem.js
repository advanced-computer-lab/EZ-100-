import classes from "./ReservationItem.module.css";
import Card from "../../UI/Card";
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
                <div className={classes.flexContained1}>
                  {reservation.departureFlight.FlightNumber}
                </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Departure Date</label>
                <div className={classes.flexContained1}>
                  {reservation.departureFlight.DepartureDate}
                </div>
              </div>
              <div className={classes.content}>
                <label>Arrival Date </label>
                <div className={classes.flexContained1}>
                  {reservation.departureFlight.ArrivalDate}
                </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Seats</label>
                <div className={classes.flexContained1}>
                  {reservation.departureSeats}
                </div>
              </div>
              <div className={classes.content}>
                <label>Price</label>
                <div className={classes.flexContained1}>
                  {reservation.totalPrice}${" "}
                </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Cabin</label>
                <div className={classes.flexContained1}>
                  {reservation.cabin}
                </div>
              </div>
              <div className={classes.content}>
                <label>Allowed Baggage</label>
                <div className={classes.flexContained1}>
                  {reservation.baggageAllowance}KG
                </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>From</label>
                <div className={classes.flexContained1}>
                  {reservation.departureFlight.From}
                </div>
              </div>
              <div className={classes.content}>
                <label>To</label>
                <div className={classes.flexContained1}>
                  {reservation.departureFlight.To}
                </div>
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
                <div className={classes.flexContained1}>
                  {reservation.arrivalFlight.FlightNumber}
                </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Departure Date</label>
                <div className={classes.flexContained1}>
                  {reservation.arrivalFlight.DepartureDate}
                </div>
              </div>
              <div className={classes.content}>
                <label>Arrivale Date </label>
                <div className={classes.flexContained1}>
                  {reservation.arrivalFlight.ArrivalDate}
                </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Seats</label>
                <div className={classes.flexContained1}>
                  {reservation.arrivalSeats}
                </div>
              </div>
              <div className={classes.content}>
                <label>Price</label>
                <div className={classes.flexContained1}>
                  {reservation.totalPrice}$
                </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Cabin</label>
                <div className={classes.flexContained1}>
                  {reservation.cabin}
                </div>
              </div>
              <div className={classes.content}>
                <label>Allowed Baggage</label>
                <div className={classes.flexContained1}>
                  {reservation.baggageAllowance}kg
                </div>
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

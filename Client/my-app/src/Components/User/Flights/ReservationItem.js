import classes from "./ReservationItem.module.css";
import Card from "../../UI/Card";
export const ReservationItem = (props) => {
  const reservation = props.reservation;

  function CancelReservationHandler() {
    props.onCancel(reservation._id);
  }

  console.log(reservation);

  let departureDate = new Date(reservation.departureFlight.DepartureDate);
  let arrivalDate = new Date(reservation.departureFlight.ArrivalDate);

  let departureDate2 = new Date(reservation.arrivalFlight.DepartureDate);
  let arrivalDate2 = new Date(reservation.arrivalFlight.ArrivalDate);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  departureDate = {
    time: departureDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    longDate: departureDate.toLocaleDateString("en-US", options),
  };

  arrivalDate = {
    longDate: arrivalDate.toLocaleDateString("en-US", options),
    time: arrivalDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  departureDate2 = {
    time: departureDate2.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    longDate: departureDate2.toLocaleDateString("en-US", options),
  };

  arrivalDate2 = {
    longDate: arrivalDate2.toLocaleDateString("en-US", options),
    time: arrivalDate2.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  let temp;
  let cabin;
  let depPrice;
  let returnPrice;
  if (reservation.cabin === "Economy") {
    temp = "E";
    cabin = "Economy";
    depPrice = reservation.departureFlight.EconomyPrice;
    returnPrice = reservation.arrivalFlight.EconomyPrice;
  } else if (reservation.cabin === "Business") {
    temp = "B";
    cabin = "Business";
    depPrice = reservation.departureFlight.BusinessPrice;
    returnPrice = reservation.arrivalFlight.BusinessPrice;
  } else {
    temp = "F";
    cabin = "First class";
    depPrice = reservation.departureFlight.FirstPrice;
    returnPrice = reservation.arrivalFlight.FirstPrice;
  }
  let depSeats = [];
  let returnSeats = [];
  for (const seat of reservation.departureSeats) {
    depSeats.push(temp + seat);
  }

  for (const seat of reservation.arrivalSeats) {
    returnSeats.push(temp + seat);
  }

  return (
    <Card>
      <div className={classes["header-row"]}>
        <h3>Reservation id : {reservation._id}</h3>
      </div>
      <div className={classes["header-row"]}>
        <h3>Total price : ${reservation.totalPrice}</h3>
        <button
          style={{ fontSize: "1.1rem" }}
          className="btn"
          onClick={CancelReservationHandler}
        >
          Cancel reservation
        </button>
      </div>

      <div className={classes.flexContainer}>
        <div className={classes.flexContained}>
          <div style={{ justifyContent: "center" }} className={classes.row}>
            <div
              style={{ width: "40%", alignItems: "center" }}
              className={classes.content}
            >
              <label>Flight Number</label>
              <div className={classes.flexContained1}>
                {reservation.departureFlight.FlightNumber}
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
          <div className={classes.row}>
            <div className={classes.content}>
              <label>Departure Date</label>
              <div className={classes.flexContained1}>
                {departureDate.longDate} -- {departureDate.time}
              </div>
            </div>
            <div className={classes.content}>
              <label>Arrival Date </label>
              <div className={classes.flexContained1}>
                {arrivalDate.longDate} -- {arrivalDate.time}
              </div>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.content}>
              <label>Seat(s) reserved</label>
              <div className={classes["seats-row"]}>
                {depSeats.map((seat) => (
                  <span key={seat}>{seat}</span>
                ))}
              </div>
            </div>
            <div className={classes.content}>
              <label>Price per seat</label>
              <div className={classes.flexContained1}>${depPrice}</div>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.content}>
              <label>Cabin</label>
              <div className={classes.flexContained1}>{cabin}</div>
            </div>
            <div className={classes.content}>
              <label>Allowed Baggage</label>
              <div className={classes.flexContained1}>
                {reservation.departureFlight.BaggageAllowance} kg
              </div>
            </div>
          </div>
        </div>
        <div className={classes.flexContained}>
          <div className={classes.flexContained1}>
            <div style={{ justifyContent: "center" }} className={classes.row}>
              <div
                style={{ width: "40%", alignItems: "center" }}
                className={classes.content}
              >
                <label>Flight Number</label>
                <div className={classes.flexContained1}>
                  {reservation.arrivalFlight.FlightNumber}
                </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>From</label>
                <div className={classes.flexContained1}>
                  {reservation.arrivalFlight.From}
                </div>
              </div>
              <div className={classes.content}>
                <label>To</label>
                <div className={classes.flexContained1}>
                  {reservation.arrivalFlight.To}
                </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Departure Date</label>
                <div className={classes.flexContained1}>
                  {departureDate2.longDate} -- {departureDate2.time}
                </div>
              </div>
              <div className={classes.content}>
                <label>Arrival Date </label>
                <div className={classes.flexContained1}>
                  {arrivalDate2.longDate} -- {arrivalDate2.time}
                </div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Seat(s) reserved</label>
                <div className={classes["seats-row"]}>
                  {returnSeats.map((seat) => (
                    <span key={seat}>{seat}</span>
                  ))}
                </div>
              </div>
              <div className={classes.content}>
                <label>Price per seat</label>
                <div className={classes.flexContained1}>${returnPrice}</div>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.content}>
                <label>Cabin</label>
                <div className={classes.flexContained1}>{cabin}</div>
              </div>
              <div className={classes.content}>
                <label>Allowed Baggage</label>
                <div className={classes.flexContained1}>
                  {reservation.arrivalFlight.BaggageAllowance} kg
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

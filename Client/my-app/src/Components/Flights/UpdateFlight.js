import { useState, useContext } from "react";
import classes from "./UpdateFlight.module.css";
import AuthContext from "../../store/auth-context";

export const UpdateFlight = (props) => {
  const { flight } = props;
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const dateForDateTimeInputValue = (date) =>
    new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000)
      .toISOString()
      .slice(0, 19);

  let departureDate = new Date(flight.DepartureDate);
  let arrivalDate = new Date(flight.ArrivalDate);

  const localDepartureDate = dateForDateTimeInputValue(departureDate);
  const localArrivalDate = dateForDateTimeInputValue(arrivalDate);

  const [FlightNumberValue, setflightNumberValue] = useState(
    flight.FlightNumber
  );
  const [FromNumberValue, setFromNumberValue] = useState(flight.From);
  const [ToNumberValue, setToNumberValue] = useState(flight.To);
  const [FlightDepartureTimeValue, setDepartureTimeValue] =
    useState(localDepartureDate);
  const [FlightArrivalTimeValue, setArrivalTimeValue] =
    useState(localArrivalDate);
  const [EconomyClassValue, setEconomyClassValue] = useState(
    flight.EconomySeats
  );
  const [BusinessClassValue, setBusinessClassValue] = useState(
    flight.BusinessSeats
  );
  const [FirstClassValue, setFirstClassValue] = useState(flight.FirstSeats);
  const [TerminalValue, setTerminalValue] = useState(flight.TerminalNumber);
  const [formIsChanged, setFromIsChanged] = useState(false);

  function refreshPage() {
    window.location.reload();
  }

  async function onUpdateHandler(event) {
    event.preventDefault();
    const updatedFlight = {
      FlightNumber: FlightNumberValue,
      DepartureDate: FlightDepartureTimeValue,
      ArrivalDate: FlightArrivalTimeValue,
      EconomySeats: EconomyClassValue,
      BusinessSeats: BusinessClassValue,
      FirstSeats: FirstClassValue,
      TerminalNumber: TerminalValue,
      To: ToNumberValue,
      From: FromNumberValue,
    };

    await fetch(
      `http://localhost:5000/api/flights/updateFlight/${flight._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFlight),
      }
    );

    refreshPage();
  }

  function flightNumberChangeHandler(event) {
    setFromIsChanged(true);
    setflightNumberValue(event.target.value);
  }

  function DepartureDateChangeHandler(event) {
    setFromIsChanged(true);
    setDepartureTimeValue(event.target.value);
  }
  function ArrivalDateChangeHandler(event) {
    setFromIsChanged(true);
    setArrivalTimeValue(event.target.value);
  }
  function EconomyClassHandler(event) {
    setFromIsChanged(true);
    setEconomyClassValue(event.target.value);
  }
  function BusinessClassHandler(event) {
    setFromIsChanged(true);
    setBusinessClassValue(event.target.value);
  }

  function FirstClassHandler(event) {
    setFromIsChanged(true);
    setFirstClassValue(event.target.value);
  }
  function TerminalHandler(event) {
    setFromIsChanged(true);
    setTerminalValue(event.target.value);
  }
  function FromHandler(event) {
    setFromIsChanged(true);
    setFromNumberValue(event.target.value);
  }
  function ToHandler(event) {
    setFromIsChanged(true);
    setToNumberValue(event.target.value);
  }

  return (
    <form className={classes.signupForm}>
      <div className={classes.formHeader}>
        <h1>Update Flight</h1>
      </div>
      <div className={classes.formBody}>
        <div className={classes.row}>
          <div className={classes.inputGroup}>
            <label>Flight Number </label>
            <input
              type="text"
              placholder="Enter Flight Number"
              value={FlightNumberValue}
              onChange={flightNumberChangeHandler}
              className={classes.input}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.inputGroup}>
            <label>From </label>
            <input
              className={classes.input}
              type="text"
              placholder="Enter Flight Number"
              value={FromNumberValue}
              onChange={FromHandler}
            />
          </div>
          <div className={classes.inputGroup}>
            <label>To </label>
            <input
              className={classes.input}
              type="text"
              placholder="Enter Flight Number"
              value={ToNumberValue}
              onChange={ToHandler}
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.inputGroup}>
            <label>Departure Time </label>
            <input
              className={classes.input}
              type="datetime-local"
              value={FlightDepartureTimeValue}
              onChange={DepartureDateChangeHandler}
            />
          </div>
          <div className={classes.inputGroup}>
            <label>Arrival Time </label>
            <input
              className={classes.input}
              type="datetime-local"
              value={FlightArrivalTimeValue}
              onChange={ArrivalDateChangeHandler}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.inputGroup}>
            <label htmlFor="quantity">Available Seats in Economy Class:</label>
            <input
              className={classes.input}
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              max="100"
              step="1"
              value={EconomyClassValue}
              onChange={EconomyClassHandler}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.inputGroup}>
            <label htmlFor="quantity">Available Seats in Business Class:</label>
            <input
              className={classes.input}
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              max="100"
              step="1"
              value={BusinessClassValue}
              onChange={BusinessClassHandler}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.inputGroup}>
            <label htmlFor="quantity">Available Seats in First Class:</label>
            <input
              className={classes.input}
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              max="100"
              step="1"
              value={FirstClassValue}
              onChange={FirstClassHandler}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.inputGroup}>
            <label>Terminal </label>
            <input
              className={classes.input}
              type="number"
              min="1"
              placholder="Terminal"
              value={TerminalValue}
              onChange={TerminalHandler}
            />
          </div>
        </div>
      </div>
      <div className={classes.formFooter}>
        <button
          className={classes.btn}
          onClick={onUpdateHandler}
          disabled={!formIsChanged}
        >
          Update
        </button>
      </div>
    </form>
  );
};

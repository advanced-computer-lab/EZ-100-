import React from "react";
import classes from "./FlightInfo.module.css";

export const FlightInfo = (props) => {
  const { flight } = props;

  let departureDate = new Date(flight.DepartureDate);
  let arrivalDate = new Date(flight.ArrivalDate);
  // let arrivalDate = new Date(
  //   new Date(flight.ArrivalDate).getTime() + 690 * 60000
  // );

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const departure = {
    time: departureDate.toLocaleTimeString(),
    longDate: departureDate.toLocaleDateString("en-US", options),
  };

  const arrival = {
    longDate: arrivalDate.toLocaleDateString("en-US", options),
    time: arrivalDate.toLocaleTimeString(),
  };

  const updateBtnClickHandler = (event) => {
    event.preventDefault();
    props.onUpdateButtonClicked();

    console.log("Update button clicked");
  };

  const deleteBtnClicked = (event) => {
    event.preventDefault();
    props.onDeleteButtonClicked();

    console.log("Delete button clicked");
  };

  return (
    <div className={classes.container}>
      <div className={classes.flight}>
        <div>
          <p>
            {flight.FlightNumber} -{" "}
            <span className={classes.details}>
              {flight.From} : Terminal {flight.TerminalNumber} {"  ---  "}
              {flight.To}
            </span>
          </p>

          <div className={classes["timing-info"]}>
            Depart on {departure.longDate} at {departure.time}
          </div>

          <div className={classes["timing-info"]}>
            Arrive on {arrival.longDate} at {arrival.time}
          </div>
        </div>

        <div className={classes["cabin-info"]}>
          <div>
            <label style={{ marginRight: "47px" }}>First class:</label>{" "}
            {flight.FirstSeats} seats available.
          </div>
          <div>
            <label>Business class:</label> {flight.BusinessSeats} seats
            available.
          </div>
          <div>
            <label>Economy class:</label> {flight.EconomySeats} seats available.
          </div>
        </div>
      </div>

      <div className={classes.actions}>
        {/* <Button variant="outlined" color="error" onClick={deleteBtnClicked}>
          Delete
        </Button> */}

        <button
          className="del-btn"
          style={{ fontSize: "1.1rem" }}
          onClick={deleteBtnClicked}
        >
          Delete
        </button>

        <button
          style={{ fontSize: "1.1rem" }}
          className="btn"
          onClick={updateBtnClickHandler}
        >
          Update Flight
        </button>
      </div>
    </div>
  );
};

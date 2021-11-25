import React from "react";
import classes from "./SearchForm.module.css";

import Card from "../../UI/Card";

export const SearchForm = () => {
  return (
    <div className="centered">
      <Card>
        <form className={classes.form}>
          <div className={classes.row}>
            <div className={classes["form-control"]}>
              <label>From</label>
              <input type="text"></input>
            </div>

            <div className={classes["form-control"]}>
              <label>To</label>
              <input type="text"></input>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes["form-control"]}>
              <label>Departure date</label>
              <input type="datetime-local"></input>
            </div>

            <div className={classes["form-control"]}>
              <label>Return date</label>
              <input type="datetime-local"></input>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes["form-control"]}>
              <label>Adult(s)</label>
              <input type="number" min="1"></input>
            </div>

            <div className={classes["form-control"]}>
              <label>Children</label>
              <input type="number" min="0"></input>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

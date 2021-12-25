import React, { useContext, useState } from "react";
import AuthContext from "../../../store/auth-context";

import LoadingSpinner from "../../UI/LoadingSpinner";

import classes from "./ChangePassword.module.css";

export const ChangePassword = (props) => {
  const [currentValue, setCurrentValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [confirmNewValue, setConfirmNewValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const currentChangeHandler = (event) => {
    setCurrentValue(event.target.value);
  };

  const newChangeHandler = (event) => {
    setNewValue(event.target.value);
  };

  const confirmNewChangeHandler = (event) => {
    setConfirmNewValue(event.target.value);
  };

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (newValue !== confirmNewValue) {
      setErrorMessage("(New password) must be equal to (Confirm new password)");
      return;
    }
    setErrorMessage("");

    setLoading(true);

    const body = { currentPassword: currentValue, newPassword: newValue };
    const response = await fetch(
      `http://localhost:5000/api/auth/changePassword/${authCtx.user._id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setLoading(false);
    if (!data.success) {
      setErrorMessage("Current password is incorrect");
    } else {
      setCurrentValue("");
      setNewValue("");
      setConfirmNewValue("");
      props.onCloseModal();
    }
  };

  const onCancelHandler = () => {
    props.onCloseModal();
  };

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Change your password</h3>
      <hr></hr>

      {loading && (
        <div className="centered">
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}
      {!loading && (
        <form className={classes.form}>
          <div className={classes.row}>
            <label>Current password</label>
            <input
              id="current"
              type="password"
              value={currentValue}
              onChange={currentChangeHandler}
            />
          </div>

          <div className={classes.row}>
            <label>New password</label>
            <input
              id="new"
              type="password"
              value={newValue}
              onChange={newChangeHandler}
            />
          </div>

          <div className={classes.row}>
            <label>Confirm New password</label>
            <input
              id="confirmNew"
              type="password"
              value={confirmNewValue}
              onChange={confirmNewChangeHandler}
            />
          </div>

          <div className={classes.row}>
            <p style={{ color: "red", fontSize: "0.9rem" }}>{errorMessage}</p>
          </div>

          <div className={classes.actions}>
            <button
              onClick={onCancelHandler}
              type="button"
              style={{ marginRight: "1rem" }}
              className="del-btn"
            >
              Cancel
            </button>
            <button type="submit" className="btn" onClick={onSubmitForm}>
              Confirm change
            </button>
          </div>
        </form>
      )}
    </>
  );
};

import { useState } from "react";
import classes from "./UpdateFlight.module.css";

export const UpdateFlight = (props) => {
  const { flight } = props;

  const dateForDateTimeInputValue = date => new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19)

  let departureDate = new Date(flight.DepartureDate); 
  let arrivalDate = new Date(flight.ArrivalDate);

  const localDepartureDate = dateForDateTimeInputValue(departureDate);
  const localArrivalDate = dateForDateTimeInputValue(arrivalDate);
  
  
  const [FlightNumberValue , setflightNumberValue] = useState(flight.FlightNumber);
  const [FlightDepartureTimeValue , setDepartureTimeValue] = useState(localDepartureDate);
  const [FlightArrivalTimeValue, setArrivalTimeValue] = useState(localArrivalDate);
  const [ EconomyClassValue, setEconomyClassValue] = useState(flight.EconomySeats);
  const [ BusinessClassValue, setBusinessClassValue] = useState(flight.BusinessSeats);
  const [ FirstClassValue, setFirstClassValue] = useState(flight.FirstSeats);

  function refreshPage(){
    window.location.reload();
  }
  
  async function onUpdateHandler(event){
    event.preventDefault();
    const updatedFlight = {
      FlightNumber: FlightNumberValue,
      DepartureDate: FlightDepartureTimeValue,
      ArrivalDate: FlightArrivalTimeValue,
      EconomySeats: EconomyClassValue,
      BusinessSeats: BusinessClassValue,
      FirstSeats: FirstClassValue

    }
    
    
    await fetch(`http://localhost:5000/api/flights/updateFlight/${flight._id}`,{
      method: 'PUT',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify(updatedFlight)
    })

    refreshPage();

  }


  function flightNumberChangeHandler(event) {
     setflightNumberValue(event.target.value);
    }

  function DepartureDateChangeHandler(event){
    setDepartureTimeValue(event.target.value);
  }
  function ArrivalDateChangeHandler(event){
    setArrivalTimeValue(event.target.value);
  }
  function EconomyClassHandler(event){
    setEconomyClassValue(event.target.value)
  }
  function BusinessClassHandler(event){
    setBusinessClassValue(event.target.value)
  }

  function FirstClassHandler(event){
    setFirstClassValue(event.target.value)
  }


 
  console.log(FlightNumberValue);
  
  return (
    <section id={classes.regesterationPage}>
      <form className={classes.signupForm}>
        <div className={classes.formHeader}>
          <h1>Update Flight</h1>
        </div>
        <div className={classes.formBody}>
          <div className={classes.row}>
            <div className={classes.inputGroup}>
              <label>Flight Number </label>
              <input type="text" placholder="Enter Flight Number" value={FlightNumberValue} onChange={flightNumberChangeHandler}/>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.inputGroup}>
              <label>Departure Time </label>
              <input type="datetime-local" value={FlightDepartureTimeValue} onChange={DepartureDateChangeHandler} />
            </div>
            <div className={classes.inputGroup}>
              <label>Arrival Time </label>
              <input type="datetime-local" value={FlightArrivalTimeValue} onChange={ArrivalDateChangeHandler}/>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.inputGroup}>
              <label htmlFor="quantity">Available Seats in Economy Class:</label>
              <input
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
        </div>
        <div className={classes.formFooter}>
          <button className={classes.btn} onClick={onUpdateHandler}>Update</button>
        </div>
      </form>
    </section>
  );
};

import React, { Component } from "react";
import "../Pages/NewFlight.css";
import Card from "../Components/UI/Card";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import { createFlight } from "../lib/api";


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
class NewFlight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flight_number: "",
      from:"",
      to:"",
      departure_date: "",
      arrival_date: "",
      economy_seats: "",
      business_seats: "",
      first_seats: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  flighthandler = (event) => {
    this.setState({
      flight_number: event.target.value,
    });
  };
  fromhandler = (event) => {
    this.setState({
      from: event.target.value,
    });
  };
  tohandler = (event) => {
    this.setState({
      to: event.target.value,
    });
  };
 

  departuredatehandler = (event) => {
    this.setState({
      departure_date: event.target.value,
    });
  };
  arrivaldatehandler = (event) => {
    this.setState({
      arrival_date: event.target.value,
    });
  };

  economyseatshandler = (event) => {
    this.setState({
      economy_seats: event.target.value,
    });
  };
  businessseatshandler = (event) => {
    this.setState({
      business_seats: event.target.value,
    });
  };
  firstseatshandler = (event) => {
    this.setState({
      first_seats: event.target.value,
    });
  };
  handleSubmit = async (event)=> {
    event.preventDefault();
    const newflight= {
      FlightNumber: this.state.flight_number,
      From:this.state.from,
      To:this.state.to,
      DepartureDate:this.state.departure_date, 
      ArrivalDate: this.state.arrival_date,
      EconomySeats: this.state.economy_seats,
      BusinessSeats: this.state.business_seats,
      FirstSeats: this.state.first_seats
    
        }
      //onsole.log(this.state.departure_date)
    const responce = await fetch(
      "http://localhost:5000/api/flights/createFlight",
      {
        method: "POST",
        body: JSON.stringify(newflight), // convert movie from JS object => JSON
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await responce.json();
  //   console.log("newflight");
  //   alert(
  //         `${this.state.flight_number} created Successfully `
  //       );
    
  
   };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "flight_number":
        formErrors.flight_number =
          value.length < 2 ? "minimum 2 characaters required" : "";
        break;
      case "from":
        formErrors.from =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "to":
        formErrors.to = value.length < 3 ? "minimum 3 characaters required" : "";
          
        break;
      case "departure_date":
        formErrors.departure_date =
          value.length < 1 ? "enter departure date" : "";
        break;
        case "arrival_date":
        formErrors.arrival_date =
          value.length < 1 ? "enter arrival date" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  
  // /handleSubmit = async (event) => {
  //   const newflight= {
  //     FlightNumber: "eez",
  //     From:"caixd",
  //     To:"xd",
  //     DepartureDate: new Date.now,
  //     ArrivalDate: new Date.now,
  //     EconomySeats: 3,
  //     BusinessSeats: 3,
  //     FirstSeats: 3,

  //   }
  //   try{
  //     await createFlight(newflight)
  //   }
  //   catch (e){
  //     console.log(e);
  //   }
    
  //   alert(
  //     `${this.state.flight_number} created Successfully `
  //   );
  //   console.log(this.state);
  //   this.setState({
  //     flight_number: "",
  //     airport:"",
  //     departure_time: "",
  //     arrival_time: "",
  //     economy_seats: "",
  //     business_seats: "",
  //   });
  //   event.preventDefault();
  // };
  render() {
      const formErrors  = this.state;
    return (
      
    
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Flight</h1>
        <form onSubmit={this.handleSubmit}  >
          <div className='flight_number'>
            <label htmlFor='flight_number'>Flight Number</label>
            <input
              type="text"
              className={formErrors.flight_number.length > 0 ? "error" : null}
              name="flight_number"
              value={this.state.flight_number}
              onChange={this.flighthandler}
              placeholder="flight number"
              
            />
             {formErrors.flight_number.length > 0 && (
                <span className="errorMessage">{formErrors.flight_number}</span>
              )}
          </div>
          <div className="from">
            <label htmlFor="from">From </label>
            <input
              type="text"
              className={formErrors.from.length > 0 ? "error" : null}
              name="from"
              value={this.state.from}
              onChange={this.fromhandler}
              placeholder="from"/>
               {formErrors.from.length > 0 && (
                <span className="errorMessage">{formErrors.from}</span>
              )}
              </div>

            <div className="to">
            <label htmlFor="to">To </label>
            <input
              type="text"
              className={formErrors.to.length > 0 ? "error" : null}
              name="to"
              value={this.state.to}
              onChange={this.tohandler}
              placeholder="to"/>
               {formErrors.to.length > 0 && (
                <span className="errorMessage">{formErrors.to}</span>
              )}
              </div>

          <div className="departure_date">
            <label htmlFor="departure_date">Departure date </label>
            <input
              type="datetime-local"
              className={formErrors.departure_date.length > 0 ? "error" : null}
              name="departure_date"
              value={this.state.departure_date}
              onChange={this.departuredatehandler}
              placeholder="departure date"
              
            />
            {formErrors.departure_date.length > 0 && (
                <span className="errorMessage">{formErrors.departure_date}</span>
              )}
          </div>
          <div className='arrival_date'>
            <label htmlFor="arrival_date">Arrival date </label>
            <input
              type="datetime-local"
              className={formErrors.arrival_date.length > 0 ? "error" : null}
              name="arrival_date"
              value={this.state.arrival_date}
              onChange={this.arrivaldatehandler}
              placeholder="Arrival date"
             
            />
            {formErrors.arrival_date.length > 0 && (
                <span className="errorMessage">{formErrors.arrival_date}</span>
              )}
          </div>

          
          <div className="business_seats">
            <label htmlFor="business_seats">Business seats</label>
            <input
              type="number"
              className={formErrors.business_seats.length > -1 ? "error" : null}
              name="business_seats"
              value={this.state.business_seats}
              onChange={this.businessseatshandler}
              placeholder="business seats"
            
            />
            {formErrors.business_seats.value > 0 && (
                <span className="errorMessage">{formErrors.business_seats}</span>
              )}
          </div>

          <div className="economy_seats">
          <label htmlFor="economy_seats">Economy seats </label>
          <input
            type="number"
            className={formErrors.economy_seats.length > -1 ? "error" : null}

          name="economy_seats"
            value={this.state.economy_seats}
            onChange={this.economyseatshandler}
            placeholder="economy seats"
            
          />
          {formErrors.economy_seats.value > -1  && (
                <span className="errorMessage">{formErrors.economy_seats}</span>
              )}
         </div>
         <div className="first_seats">
          <label htmlFor="first_seats">First seats </label>
          <input
            type="number"
            className={formErrors.first_seats.length > -1 ? "error" : null}
            name="first_seats"
            value={this.state.first_seats}
            onChange={this.firstseatshandler}
            placeholder="first seats"
            
          />
          {formErrors.first_seats.length > 0 && (
                <span className="errorMessage">{formErrors.first_seats}</span>
              )}
         </div>
         <div className="Create">
          <button type="submit">Create Flight</button> 
          </div>
        </form>
      </div>
    </div>
    
      
     
  );
}
}

export default NewFlight;


import React, { Component, useState } from "react";
import "./App.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from './Datepicker';
import Icon from './icon';
import * as firebase from 'firebase';
import DateInput from './Datepicker';
import {db} from './firebase';
import moment from 'moment';
var buttonDisabled = true;


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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


class App extends Component {

  constructor(props) {
    super(props);
      this.handleBOD = this.handleBOD.bind(this);
      this.enableHoursInput = this.enableHoursInput.bind(this);
      this.state = {
        costumers: []
      };
      this.state = { 
        disabled: true 
      };

      this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      date: null,
      time: null,
      service: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        service: "",
      }
    };
  }


    enableHoursInput () {
      console.log('ok');
      if (!this.state.disabled) {
        this.setState({
          disabled : false
        });
      }
    }

    handleBOD(d){
        this.state.date = d;
        //GET HOURS OCCUPATE.
        var barberFormsRef = db.collection("barberForm");
        // Create a query against the collection.
        var query = barberFormsRef.where("date", "==", this.state.date);
        query.get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
     });
    });
  }

   handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
  
    switch (name) {
      case "name":
        formErrors.firstName =
          value.length < 3 ? "almeno 3 caratteri richiesti" : "";
        break;
      case "surname":
        formErrors.lastName =
          value.length < 3 ? "almeno 3 caratteri richiesti" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "email non valida";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  state = {
		name: "",
    surname: "", 
    email: "",
    phone: "",
    date: "",
    time:"",
    service: ""
	}

  updateInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount(){
    this.setState({
      disabled : true
    })
  }

  addClient = event => {
	event.preventDefault()

	db.collection("barberForm").add({
		name: this.state.name,
    surname: this.state.surname,
    email: this.state.email,
    phone: this.state.phone,
    date: firebase.firestore.Timestamp.fromDate(this.state.date),
    time: this.state.time,
    service: this.state.service
	})

  this.setState({ name: "", surname: "", email:"", phone: "", date: "",time: "", service: "" })
}

  render() {
    const { formErrors } = this.state;
    const { name, surname, email, phone, date, time, service} = this.state;
    const {disabled}= this.state;
  
    return (
      <div className="wrapper">
        <div className="form-wrapper">
        <Icon />
          <h1>Prenota ora</h1>
          <form onSubmit={this.addClient} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">Nome</label>
              <input
                className={formErrors?.firstName.length > 0 ? "error" : null}
                placeholder="Nome"
                type="text"
                name="name"
                noValidate
                onChange={this.updateInput}
                id="userName"
              />
              {formErrors.firstName.length > 0 && (<span className="errorMessage">{formErrors.firstName}</span>)}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Cognome</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Cognome"
                type="text"
                name="surname"
                noValidate
               onChange={this.updateInput}
                id="userSurname"
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
                id="userEmail"
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="phone">
              <label htmlFor="phone-number">Telefono</label>
              <input 
              placeholder="Telefono"
              type="tel"
              id="phone"
              onChange={this.handleChange}
              name="phone"
              />
            </div>
            <div className="services">
            <FormControl >
            <InputLabel className="servicesInputLabel" id="userService">Servizi</InputLabel>
            <Select className="select" id="service" name="service" onChange={this.handleChange}>
            <MenuItem value={"Taglio"}>Taglio</MenuItem>
            <MenuItem value={"Shampoo"}>Shampoo</MenuItem>
            <MenuItem value={"Barba"}>Barba</MenuItem>
            </Select>
            </FormControl>
            </div> 
            <div className="date" >      
         <div>
            <InputLabel id="demo-mutiple-name-label">Data</InputLabel>
       <DateInput
        props={this.handleBOD}
        id="date"
        label="Data"
        type="date"
        name="date"
        onChange={this.handleChange}
        style={{marginRight: "20px"}}
        InputLabelProps={{
        shrink: true,
        }}/>
        </div>
   <FormControl style={{width: "100px"}}>
        <InputLabel id="demo-mutiple-name-label">Ora</InputLabel>
        <Select
          disabled = {this.state.date == null}
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          name="time"
          id="time"
          onChange={this.handleChange}>    
            <MenuItem value={"08:00"}  >
              08:00
            </MenuItem>
            <MenuItem value={"08:35"} >
              08:35
            </MenuItem>
            <MenuItem value={"09:10"} >
              09:10
            </MenuItem>
            <MenuItem value={"09:45"} >
              09:45
            </MenuItem>
            <MenuItem value={"10:20"} >
              10:20
            </MenuItem>
            <MenuItem value={"10:55"}>
              10:55
            </MenuItem>
            <MenuItem value={"11:30"}>
              11:30
            </MenuItem>
            <MenuItem value={"12:05"}>
              12:05
            </MenuItem>
            <MenuItem value={"12:40"}>
              12:40
            </MenuItem>
            <MenuItem value={"13:15"}>
              13:15
            </MenuItem>
            <MenuItem value={"15:00"}>
              15:00
            </MenuItem>
            <MenuItem value={"15:35"}>
              15:35
            </MenuItem>
            <MenuItem value={"16:10"}>
              16:10
            </MenuItem>
            <MenuItem value={"16:45"}>
              16:45
            </MenuItem>
            <MenuItem value={"17:20"}>
              17:20
            </MenuItem>
            <MenuItem value={"17:55"}>
            17:55
            </MenuItem>
            <MenuItem value={"18:30"}>
            18:30
            </MenuItem>
            <MenuItem value={"19:05"}>
            19:05
            </MenuItem>
            <MenuItem value={"19:40"}>
            19:40
            </MenuItem>
        </Select>
      </FormControl>
    </div> 
           
            <div className="createAccount">
              <button type="submit" id="submit">Prenota</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
  
export default App;
import React, { useState } from 'react';
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
//import Alert from "reactjs-alert"

import { Container, Row, Col } from 'reactstrap';

import {
    Alert,
} from 'reactstrap';

//import './page.css';

let prev = 0;
let next = 0;
let last = 0;

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});
class Alerts extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            currentPage: 1,
            todosPerPage: 9,
            notif: '',
        };
        this.getData = this.getData.bind(this);
 
    }


    getData() {
        instance
            .get("/api/notifications/notif-data")
            .then(res => {
                this.setState({ notif: res.data})
              
            })
            .catch()
    }

    componentDidMount() {
        this.getAll();
      }
      getAll() {
        fetch("http://localhost:5000/api/notifications/notif-data", { method: "GET" })
          .then(response => response.json())
          .then(data => {
            console.log("notification", data);
            this.setState({ records: data })
          })
      }

render(){

    let { records, currentPage, todosPerPage } = this.state;
    prev = currentPage > 0 ? (currentPage - 1) : 0;

   // last = Math.ceil(records.length / todosPerPage);

    next = (last === currentPage) ? currentPage : currentPage + 1;



    // Logic for displaying page numbers

    let pageNumbers = [];

    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }




    let indexOfLastTodo = currentPage * todosPerPage;

    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;

    let currentTodos = records.slice(indexOfFirstTodo, indexOfLastTodo);
   // currentTodos = records.reverse()//pour avoir les dernier en premier

    return (
        <div>
            <Navbar />
            <div className="d-flex" id="wrapper">
            <Sidebar />
           <div id="page-content-wrapper">
           <div className="container-fluid">
              <h2 id='text-color'> Notifications </h2>
       
              <Alert id='alert-color'>
              {
                    currentTodos.map((item, index) => {

                      return (

                        <tr key={index}>
                 
                  <p id='text-color'>{item.notif}</p>
                       
                        </tr>
                      );

                    })

                  }
                 
              </Alert>
          
             </div>
            </div>
            </div>
            
        </div>
    );
}
}

export default Alerts;
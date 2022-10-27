import React from "react";
import Notifications from "@material-ui/icons/Notifications";
import { Link } from "react-router-dom";


import axios from "axios";
const instance = axios.create({
  baseURL: 'http://localhost:5000'
});
//import ReactNotification from "react-notifications-component";
export default class Notif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      Notifications: [],


    }
    this.countnotif = this.countnotif.bind(this);
    //this.setvu = this.setvu.bind(this);
  }



  /*pour faire le store d'une valeur
  componentDidUpdate() {
    localStorage.setItem('_increment', JSON.stringify(this.state))  
  }
  
  componentDidMount() {
    const data = localStorage.getItem('_increment')
    if(data) {
      this.setState(prevState => {
        return JSON.parse(data)
      })
    }
  }
  
  
  */
  //pour rendre le vu a true et le nombre a 0
  setVu(event) {
    this.setState({
      number: event.target.value
    });

    instance.post("/api/notifications/vunotif")
      .then(res => {
        console.log("data", res.data);
      })
      .catch()


  }
  /*pour rendre le vu a true 
  setvu() {
   
    axios
  
        .post("/api/notifications/vunotif")
        .then (res=> {
          console.log ("data",res.data);
        })
        .catch()
       
  
  }*/

  //pour avoir la dat de bd
  componentWillMount() {
    fetch("http://localhost:5000/api/notifications/notif-data")
      .then(res => res.json())

      .then(data => this.setState({ Notifications: data }));

  }
  //pour donne le nombre de notification non vu
  countnotif(count) {
    var array = this.state.Notifications
    var count = 0
    var i;
    for (i = 0; i < array.length; i++) {
      if ((array[i].Vu === "false")) {
        array[i].Vu = "true"
        count++
      }
    }
    return count

  }

  render() {


    return (
      <div>
        <div className="app-content">


          <Link to="/notif" id='notif'>
            <Notifications
              onClick={this.setVu.bind(this)} />
            <this.countnotif />

          </Link>

        </div>
      </div>
    );
  }
}
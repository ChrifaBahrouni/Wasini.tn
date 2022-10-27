import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {
  Card,

} from "reactstrap";
export default class ChangePassword extends React.Component {

  emptyAdmin = {
    email: '',
    new_password: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyAdmin
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    await fetch(`/api/admins/change_password/${item.email}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      

      body: JSON.stringify(item),
      
    });
  }
  handleEvent = event => {
    alert("Password Changed");
  };
  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? 'Edit Customer' : 'Edit Password'}</h2>;

    return (

      <div>
        <Navbar />
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Card md="12" id="page-content-wrapper" class="card-class">
              <h1 class="change-pass">Change Password</h1>
              <form onSubmit={this.handleSubmit} id='form-data'> 



                <div class="form-group">
                  <label for="email" class="input-data">Email Address:</label>
                  <input
                    type="text"
                    name="email"
                    //value={this.state.input.email}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="Enter email"
                    id="email" />

                  <div className="text-danger"></div>
                </div>

                <div class="form-group">
                  <label for="password" class="input-data"> New Password:</label>
                  <input
                    type="password"
                    name="password"
                    // value={this.state.input.password}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="Enter password"
                    id="password" />

                  <div className="text-danger"></div>
                </div>

                <div class="form-group">
                  <label for="password" class="input-data">Confirm Password:</label>
                  <input
                    type="password"
                    name="confirm_password"
                    // value={this.state.input.confirm_password}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="Enter confirm password"
                    id="confirm_password" />

                  <div className="text-danger"></div>
                </div>
                
                <button
                  //onClick={this.handleEvent}
                  type="submit"
                  className="btn btn-large btn-warning mt-2 px-5">
                  Change Password
                </button>
                {/**  <input type="submit" value="Change Password" class="btn btn-success"
   

   />*/}
              </form>
  
    </Card>
          </div>
        </div>
      </div>)
  }
}

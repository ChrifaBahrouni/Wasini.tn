import React, { Component } from "react";
import Navbar from "../../partials/Navbar";
import Sidebar from "../../partials/Sidebar";
import "./chatContent.css";
//import ChatList from "../chatList/ChatList";
import ChatContent from "./ChatContent";

export default class ChatBody extends Component {
  render() {
    return (
      <div>
        <Navbar/>

        <div className="d-flex" id="wrapper">

          <Sidebar/>
          <div className="main__chatbody">
            <ChatContent />
           
    
          </div>
        </div>
      </div>
    );
  }
}
import React, { Component, useState, createRef, useEffect } from "react";

import ChatItem from "./ChatItem";


export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  //le conteneur de data
  chatItms = [
  
    
    {
      key: 5,
      message: this.props.message,
      type:"other",
     sender: this.props.sender,
    
    },
    
  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      message: "",
      sender: "",
      username: "",
      messages: []
    };
  }
  //pour avoir la data from chat dans la base de donnée
  componentWillMount() {
  
    fetch("http://localhost:5000/api/chats/get")
      .then(res => res.json())
      .then(data => this.setState({ messages: data }));
  }
 

  render() {
    return (
    
      <div className="main__chatcontent">
         
        <div >
          <div className="chat__items">
            {this.state.messages.map((itm, index) => {
              return ( /**pour avoir la data sur l'ecran  */
                <ChatItem 
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  message ={itm.message}
                 senderPseudo={itm.sender}  //pour avoir nom sender
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
      </div>
    );
  }
}

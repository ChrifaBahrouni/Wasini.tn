import React, { Component } from "react";


export default class ChatItem extends Component {
 
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div
      style={{ animationDelay: `0.8s` }} 
      className={`chat__item ${this.props.user ? this.props.user : ""}`} 
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.message}</div>  
         
        </div>
        
          <div className="chat__msg">{this.props.senderPseudo}</div>  
          
        
        
      </div>
    );
  }
}

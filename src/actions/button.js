import React from 'react';
import  { disabled } from "react";
export default class MyCustomButton extends React.Component {
  constructor(props) {
    this.state = {
      text: "Click Me"
    }
  }

  render() {
    var style = { backgroundColor: 'red' };

    if(disabled == false) {
      style = { backgroundColor: 'green' }
    }

    var text = this.state.text;

    if(disabled) {
      text = "Loading...";
    }

    return (
      <button disabled={disabled} style={style}>
        {text}
      </button>
    );
  }
}
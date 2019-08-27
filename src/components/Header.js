import React, { Component } from "react";
import "../styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

const firebase = require("firebase");

class Header extends Component {


  signOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="header-card">
        <h4 style={{display: "inline-block" , width: "80%"}}>Todo</h4>
        <div style={{display: "inline-block", width: "20%", textAlign: "right"}}>
          <button className="edit-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
          <button className="edit-button" onClick={this.signOut}><FontAwesomeIcon icon={faSignOutAlt} /></button>
        </div>
      </div>
    );
  }
}

export default Header;

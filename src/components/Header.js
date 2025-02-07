import React, { Component } from "react";
import "../styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";


class Header extends Component {

  signOut = () => {
    this.props.firebase.doSignOut();
  }

  deleteTodos = () => {
    const { user } = this.props;
    this.props.firebase.getTodosFromDB(user).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.props.firebase.removeTodoFromDB(user, doc.id);
        });
    });
  }

  render() {
    return (
      <div className="header-card">
        <h4 style={{display: "inline-block" , width: "80%"}}>Todo</h4>
        <div style={{display: "inline-block", width: "20%", textAlign: "right"}}>
          <button className="edit-button" onClick={this.deleteTodos}><FontAwesomeIcon icon={faTrashAlt} /></button>
          <button className="edit-button" onClick={this.signOut}><FontAwesomeIcon icon={faSignOutAlt} /></button>
        </div>
      </div>
    );
  }
}

export default Header;

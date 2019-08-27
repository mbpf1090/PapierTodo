import React, { Component } from "react";
import "../styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheck,
  faComment,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

class TodoItem extends Component {
  toggleDone = () => {
    this.props.toggleDone(this.props.item.id);
  };

  setStyle = () => {
    const { done } = this.props.item;
    if (done)
      return {
        textDecoration: "line-through",
        color: "gray",
        fontStyle: "italic"
      };
  };

  setDoneIcon = () => {
    const { done } = this.props.item;
    return done ? (
      <FontAwesomeIcon icon={faCheck} />
    ) : (
      <FontAwesomeIcon icon={faTimes} />
    );
  };

  render() {
    const { item } = this.props;
    return [
      <td>
        <button className="edit-button" onClick={this.toggleDone}>
          {this.setDoneIcon()}
        </button>
      </td>,
      <td style={this.setStyle()}>{item.title}</td>,
      <td>
        <button
          className="edit-button"
          onClick={this.props.deleteTodo.bind(this, item.id)}
        >
          <FontAwesomeIcon icon={faComment} />
        </button>
        <button
          className="edit-button"
          onClick={this.props.toggleModal.bind(this, item.id)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </td>
    ];
  }
}

export default TodoItem;

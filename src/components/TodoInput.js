import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    if (value === "") {
      return;
    }
    this.props.addTodo({ title: value, done: false });
    this.setState({ value: "" });
    event.preventDefault();
  }
  render() {
    return (
      <tr>
        <td>
          <button
            className="edit-button"
            type="button"
            form="my_form"
            onClick={this.handleSubmit}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </td>
        <td>
          <input
            form="my_form"
            type="text"
            placeholder="Enter a Todo..."
            value={this.state.value}
            onChange={this.handleChange}
            style={{width: "100%"}}
          />
        </td>
        <td />
      </tr>
    );
  }
}

export default TodoInput;

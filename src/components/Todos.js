import React, { Component } from "react";
import TodoItem from "./TodoItem";

class Todos extends Component {
  render() {
    const rows = this.props.todoItems.map(item => {
      return (
        <tr>
          <TodoItem
            key={item.id}
            item={item}
            toggleDone={this.props.toggleDone}
            deleteTodo={this.props.deleteTodo}
            toggleModal={this.props.toggleModal}
          />
        </tr>
      );
    });
    return rows;
  }
}

export default Todos;

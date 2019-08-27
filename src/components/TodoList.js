import React, { Component } from "react";
import Todos from "./Todos";
import TodoInput from "./TodoInput";
import Modal from "./Modal";
import uuid from "uuid";
import "../styles.css";
import EmptyTodos from "./EmptyTodos";

class TodoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: uuid.v1(), title: "Take out garbage", done: false },
        { id: uuid.v1(), title: "Buy more curry from Japan", done: false },
        { id: uuid.v1(), title: "Milk the goose!", done: false }
      ],
      showModal: false,
      selectedTodo: "",
      authUser: null,
    };
}


  addTodo = item => {
    const { todos } = this.state;
    this.setState({
      todos: [item, ...todos]
    });
  };

  toggleDone = id => {
    this.setState({
      todos: this.state.todos.map(item => {
        if (item.id === id) {
          item.done = !item.done;
        }
        return item;
      })
    });
  };

  deleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => {
        return todo.id !== id;
      })
    });
  };

  toggleModal = id => {
    this.setState({ showModal: !this.state.showModal });
    this.setState({ selectedTodo: id });
    console.log(this.state.selectedTodo);
  };

  selectedTodo = () => {
    return this.state.todos.filter(todo => {
      return todo.id === this.state.selectedTodo;
    })[0];
  };

  render() {
    return (
        <div>
          <div className="card">
            <div className="container">
              {this.state.showModal ? (
                <Modal
                  className="modal"
                  toggleModal={this.toggleModal}
                  selectedTodo={this.selectedTodo()}
                />
              ) : null}

              <table>
                <tbody>
                  <TodoInput addTodo={this.addTodo} />
                  <Todos
                    todoItems={this.state.todos}
                    toggleDone={this.toggleDone}
                    deleteTodo={this.deleteTodo}
                    toggleModal={this.toggleModal}
                  />
                  <EmptyTodos/>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
}

export default TodoTable;

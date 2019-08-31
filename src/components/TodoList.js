import React, { Component } from "react";
import Todos from "./Todos";
import TodoInput from "./TodoInput";
import Modal from "./Modal";
import "../styles.css";
import EmptyTodos from "./EmptyTodos";

class TodoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      showModal: false,
      selectedTodo: "",
      authUser: null,
    };
}

  componentDidMount() {
    this.unsubscribe = this.props.firebase.getTodosFromDB(this.props.user)
      .onSnapshot(snapshot => {
        let todos = [];

        snapshot.forEach(doc => {
          todos.push({ id: doc.id, title: doc.data().title, done: doc.data().done })
          });
          this.setState({todos: todos})
        });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getTodos = (userEmail) => {
    this.props.firebase.getTodosFromDB(userEmail)
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({todos: [...this.state.todos, { id: doc.id, title: doc.data().title, done: doc.data().done },]})
        });
    });
  }

  addTodo = item => {
    //const { todos } = this.state;
    this.props.firebase.addTodoToDB(this.props.user, item)
  };

  getDoneItem = id => {
    return this.state.todos.filter((item) => {
      return item.id === id
    })[0].done
  }

  toggleDone = id => {
    const done = !this.getDoneItem(id)
    this.props.firebase.toggleDoneInDB(this.props.user, id, done)
  };

  deleteTodo = id => {
    this.props.firebase.removeTodoFromDB(this.props.user, id);
  };

  toggleModal = id => {
    this.setState({ showModal: !this.state.showModal });
    this.setState({ selectedTodo: id });
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

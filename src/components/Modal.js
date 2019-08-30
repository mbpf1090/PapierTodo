import React, { Component } from "react";
import "../styles.css";

class Modal extends Component {
  handleClose = () => {
    this.props.toggleModal();
  };

  render() {
    console.log(this.props);
    const { title } = this.props.selectedTodo;
    return (
      <div className={"modal display-block"}>
        <section className="modal-main">
          <form>
            <input placeholder={title} />
            <input placeholder="Enter details" />
          </form>
          <button onClick={this.handleClose}>close</button>
        </section>
      </div>
    );
  }
}

export default Modal;

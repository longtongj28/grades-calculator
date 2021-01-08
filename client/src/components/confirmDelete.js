import React, { Component } from "react";
import "./confirmDelete.css";
import { BsTrashFill } from "react-icons/bs";
import Modal from "react-modal";

class ConfirmDelete extends Component {
  state = {
    confirmModalIsOpen: false,
  };

  setConfirmModalIsOpen = () => {
    this.setState({
      confirmModalIsOpen: !this.state.confirmModalIsOpen,
    });
  };

  render() {
    return (
      <>
        <BsTrashFill
          onClick={() => {
            this.setConfirmModalIsOpen();
          }}
          title="Remove class"
          className="trash-btn"
        />
        <Modal
          ariaHideApp={false}
          isOpen={this.state.confirmModalIsOpen}
          onRequestClose={this.setConfirmModalIsOpen}
          style={{
            overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
            content: {
              background: "white",
              top: "25%",
              bottom: "35%",
              left: "30%",
              right: "30%",
            },
          }}
        >
          <div className="confirm-text">
            Are you sure you want to delete this course?
          </div>
          <div className="confirm-delete-btn-group">
            <button
              onClick={() => {
                this.setConfirmModalIsOpen();
                this.props.setModalIsOpen();
                this.props.deleteCourse(this.props.courseID);
                this.props.filterDB();
              }}
            >
              Delete
            </button>
            <button onClick={this.setConfirmModalIsOpen}>Cancel</button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ConfirmDelete;

import React, { Component } from "react";
import Modal from "react-modal";
import "./deleteAssignment.css";
import axios from "axios";
import { BsTrashFill } from "react-icons/bs";

class DeleteAssignment extends Component {
  state = {
    deleteAssignmentModalisOpen: false,
  };

  setDeleteAssignmentModalisOpen = () => {
    this.setState({
      deleteAssignmentModalisOpen: !this.state.deleteAssignmentModalisOpen,
    });
  };

  deleteAssignmentDB = () => {
    axios
      .delete("/assignments", {
        data: {
          assignmentID: this.props.assignmentID,
          categoryID: this.props.categoryID,
        },
      })
      .then((res) => console.log(res));
    this.props.loadAssignments();
    this.setDeleteAssignmentModalisOpen();
  };
  render() {
    return (
      <>
        <BsTrashFill
          onClick={this.setDeleteAssignmentModalisOpen}
          className="delete-assignment-btn"
        />
        <Modal
          isOpen={this.state.deleteAssignmentModalisOpen}
          onRequestClose={this.setDeleteAssignmentModalisOpen}
          ariaHideApp={false}
          style={{
            overlay: {
              background: "rgba(0,0,0,0.3)",
            },
            content: {
              top: "30%",
              bottom: "30%",
              left: "30%",
              right: "30%",
            },
          }}
        >
          <div className="confirm-delete-assignment">
            Are you sure you want to delete "{this.props.assignmentName}?"
          </div>
          <div className="delete-assignment-btn-group">
            <button
              onClick={() => {
                this.deleteAssignmentDB();
                this.props.loadAssignments();
              }}
            >
              Delete
            </button>
            <button onClick={this.setDeleteAssignmentModalisOpen}>
              Cancel
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

export default DeleteAssignment;

import axios from "axios";
import React, { Component } from "react";
import Modal from "react-modal";
import "./editAssignment.css";

class EditAssignment extends Component {
  state = {
    editAssignmentModalIsOpen: false,
    newAssignmentName: "",
    newAssignmentNum: 0,
    newAssignmentDenom: 100,
  };

  onChangeNewAssignmentName = (e) => {
    this.setState({
      newAssignmentName: e.target.value,
    });
  };
  onChangeNewAssignmentNum = (e) => {
    this.setState({
      newAssignmentNum: e.target.value,
    });
  };
  onChangeNewAssignmentDenom = (e) => {
    this.setState({
      newAssignmentDenom: e.target.value,
    });
  };
  setEditAssignmentModalIsOpen = () => {
    this.setState({
      editAssignmentModalIsOpen: !this.state.editAssignmentModalIsOpen,
      newAssignmentName: "",
      newAssignmentNum: 0,
      newAssignmentDenom: 100,
    });
  };

  onSubmitEditAssignment = () => {
    if (this.state.newAssignmentName.length === 0)
      return alert("Please enter a new assignment name.");
    if (
      this.state.newAssignmentNum.length === 0 ||
      this.state.newAssignmentDenom.length === 0
    )
      return alert("Please enter your score.");
    if (this.state.newAssignmentDenom === 0)
      return alert("The score denominator must be greater than 0.");
    const updateAssignment = {
      categoryID: this.props.categoryID,
      assignmentID: this.props.assignmentID,
      newAssignmentName: this.state.newAssignmentName,
      newScoreNum: this.state.newAssignmentNum,
      newScoreDenom: this.state.newAssignmentDenom,
    };
    axios.put("/assignments", updateAssignment).then((res) => console.log(res));
    this.setEditAssignmentModalIsOpen();
    this.props.loadAssignments();
  };

  render() {
    return (
      <>
        <button
          onClick={this.setEditAssignmentModalIsOpen}
          className="edit-assignment-btn"
        >
          Edit
        </button>
        <Modal
          isOpen={this.state.editAssignmentModalIsOpen}
          onRequestClose={this.setEditAssignmentModalIsOpen}
          ariaHideApp={false}
          style={{
            overlay: {
              background: "rgba(0,0,0,0.3)",
            },
            content: {
              top: "20%",
              bottom: "20%",
              left: "25%",
              right: "25%",
            },
          }}
        >
          <div className="new-assignment-name-section">
            <div className="edit-label">
              Current Assignment Name: {this.props.currentAssignmentName}
            </div>
            <div className="new-assignment-name-field">
              <div className="new-assignment-name-label">
                New Assignment Name:{" "}
              </div>
              <input onChange={this.onChangeNewAssignmentName} />
            </div>
          </div>
          <hr />
          <div className="new-assignment-score-section">
            <div className="edit-label">
              Current Score: {this.props.currentAssignmentScoreNum}/
              {this.props.currentAssignmentScoreDenom}
            </div>
            <div className="new-assignment-score-field">
              <div className="new-assignment-score-label">
                New Assignment Score:{" "}
              </div>
              <input type="number" onChange={this.onChangeNewAssignmentNum} />
              &nbsp;/&nbsp;
              <input
                placeholder="100"
                type="number"
                onChange={this.onChangeNewAssignmentDenom}
              />
            </div>
          </div>

          <div className="edit-assignment-btn-group">
            <button
              onClick={() => {
                this.onSubmitEditAssignment();
                this.props.loadAssignments();
              }}
            >
              Save
            </button>
            <button onClick={this.setEditAssignmentModalIsOpen}>Cancel</button>
          </div>
        </Modal>
      </>
    );
  }
}

export default EditAssignment;

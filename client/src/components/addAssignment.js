import React, { Component } from "react";
import Modal from "react-modal";
import "./addAssignment.css";
import axios from "axios";

class AddAssignment extends Component {
  state = {
    addAssignmentModalisOpen: false,
    assignmentName: "",
    assignmentNum: 0,
    assignmentDenom: 100,
    assignmentScore: "",
  };

  componentDidMount = () => {
    this.props.loadAssignments();
  };
  onChangeAssignmentName = (e) => {
    this.setState({
      assignmentName: e.target.value,
    });
  };
  onChangeAssignmentNum = (e) => {
    this.setState({
      assignmentNum: e.target.value,
    });
  };
  onChangeAssignmentDenom = (e) => {
    this.setState({
      assignmentDenom: e.target.value,
    });
  };
  setAddAssignmentModalisOpen = () => {
    this.setState({
      addAssignmentModalisOpen: !this.state.addAssignmentModalisOpen,
      assignmentName: "",
      assignmentNum: 0,
      assignmentDenom: 100,
      assignmentScore: "",
    });
  };

  calculatePercentage = () => {
    this.setState({
      assignmentScore:
        (this.state.assignmentNum / this.state.assignmentDenom) * 100,
    });
  };

  onSubmitAddAssignment = () => {
    console.log(this.props.categoryID);
    if (this.state.assignmentName.length === 0)
      return alert("Please enter an assignment name.");
    if (this.state.assignmentDenom <= 0)
      return alert("The score denominator must be greater than 0.");
    const newAssignment = {
      username: this.props.username,
      courseID: this.props.courseID,
      categoryName: this.props.categoryName,
      assignmentName: this.state.assignmentName,
      categoryID: this.props.categoryID,
      scoreNum: this.state.assignmentNum,
      scoreDenom: this.state.assignmentDenom,
    };
    axios.post("/assignments", newAssignment).then((res) => console.log(res));
    this.setAddAssignmentModalisOpen();
    this.props.loadAssignments();
  };

  render() {
    return (
      <>
        <button
          onClick={this.setAddAssignmentModalisOpen}
          className="add-assignment-btn-modal"
        >
          Add Assignment
        </button>
        <Modal
          isOpen={this.state.addAssignmentModalisOpen}
          ariaHideApp={false}
          onRequestClose={this.setAddAssignmentModalisOpen}
          style={{
            overlay: {
              background: "rgba(0,0,0,0.3)",
            },
            content: {
              top: "20%",
              bottom: "20%",
              right: "25%",
              left: "25%",
            },
          }}
        >
          <div
            onClick={this.setAddAssignmentModalisOpen}
            className="close-btn-add-assignment"
          >
            X
          </div>
          <div className="add-assignment-fields">
            <div className="assignment-name-field">
              <div className="assignment-name-label">Assignment Name:</div>
              <input onChange={this.onChangeAssignmentName} />
            </div>
            <div className="assignment-score-field">
              <div className="score-label">Assignment Score:</div>
              <input
                type="number"
                min="0"
                placeholder="0"
                onChange={this.onChangeAssignmentNum}
              />
              <hr />
              <input
                type="number"
                min="1"
                placeholder="100"
                onChange={this.onChangeAssignmentDenom}
              />
            </div>
          </div>
          {this.state.assignmentDenom.length > 0 &&
            this.state.assignmentNum.length > 0 && (
              <div className="score-in-percent">
                <button onClick={this.calculatePercentage}>
                  Calculate Percentage
                </button>
                <br />
                {this.state.assignmentScore}%
              </div>
            )}
          <div className="add-assignment-btn-group">
            <button
              onClick={() => {
                this.onSubmitAddAssignment();
                this.props.loadAssignments();
              }}
            >
              Add Assignment
            </button>
            <button onClick={this.setAddAssignmentModalisOpen}>Cancel</button>
          </div>
        </Modal>
      </>
    );
  }
}

export default AddAssignment;

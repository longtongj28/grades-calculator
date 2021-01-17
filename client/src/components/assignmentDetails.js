import React, { Component } from "react";
import Modal from "react-modal";
import "./assignmentDetails.css";
import { shuffle } from "./gradeRows";
import AddAssignment from "./addAssignment";
import DeleteAssignment from "./deleteAssignment";
import EditAssignment from "./editAssignment";

class AssignmentDetails extends Component {
  state = {
    assignmentModalIsOpen: false,
    colorArray: [
      "#001427",
      "#61A0AF",
      "#9D5C63",
      "#303633",
      "#7EA2AA",
      "#136F63",
      "#586A6A",
      "#909580",
      "#C97C5D",
      "#B36A5E",
      "#902923",
      "#932F6D",
      "#994636",
      "#D55672",
      "#14BDEB",
      "#AE8E1C",
      "#FF6700",
      "#14453D",
    ],
  };


  componentDidMount = () => {
    this.setState({
      colorArray: shuffle(this.state.colorArray),
    });
    this.props.calcOverallCategoryGrade();
  };
  setAssignmentModalIsOpen = () => {
    this.setState({
      assignmentModalIsOpen: !this.state.assignmentModalIsOpen,
    });
  };
  render() {
    return (
      <>
        <button
          onClick={this.setAssignmentModalIsOpen}
          title="Click to view, add, or edit assignments"
          className="add-assignment-btn"
        >
          Asssignments
        </button>
        <Modal
          isOpen={this.state.assignmentModalIsOpen}
          onRequestClose={this.setAssignmentModalIsOpen}
          ariaHideApp={false}
          style={{
            overlay: {
              background: "rgba(0,0,0,0.3)",
            },
            content: {
              background: "#E6EFE9",
              top: "15%",
              bottom: "15%",
              left: "20%",
              right: "20%",
            },
          }}
        >
          <div
            onClick={this.setAssignmentModalIsOpen}
            className="close-btn-assignments"
          >
            X
          </div>
          <div className="assignment-details-title">
            {this.props.categoryName} Assignments
          </div>

          <div className="add-assignment-section">
            <AddAssignment
              {...this.props}
              loadAssignments={this.props.loadAssignments}
            />
            {this.props.assignments.length === 0 && (
              <div>&nbsp; Add an assignment to get started!</div>
            )}
          </div>
          {this.props.assignments.length > 0 && (
            <div className="assignment-rows">
              <div className="assignment-headers">
                <div className="assignment-name-header">Assignment Name</div>
                <div className="score-header">Score</div>
              </div>
              {this.props.assignments.map((assignment, i) => (
                <div
                  className="assignment-row"
                  key={i}
                  style={{
                    position: "relative",
                    backgroundColor: this.state.colorArray[i],
                  }}
                >
                  <div className="assignment-name">
                    {assignment.assignmentName}
                  </div>
                  <EditAssignment
                    {...this.props}
                    loadAssignments={this.props.loadAssignments}
                    currentAssignmentName={assignment.assignmentName}
                    currentAssignmentScoreNum={assignment.scoreNum}
                    currentAssignmentScoreDenom={assignment.scoreDenom}
                    assignmentID={assignment._id}
                  />
                  <div className="assignment-score">
                    {assignment.scoreNum}/{assignment.scoreDenom}
                  </div>
                  <DeleteAssignment
                    {...this.props}
                    loadAssignments={this.props.loadAssignments}
                    assignmentID={assignment._id}
                    assignmentName={assignment.assignmentName}
                  />
                </div>
              ))}
            </div>
          )}
          {this.props.assignments.length > 0 && (
            <div className="total-category-grade">
              Total Category Grade: {this.props.overallCategoryGrade}
              %
            </div>
          )}
        </Modal>
      </>
    );
  }
}

export default AssignmentDetails;

import React, { Component } from "react";
import Modal from "react-modal";
import "./editCourseName.css";
import axios from "axios";

class EditCourseName extends Component {
  state = {
    modalIsOpen: false,
    newCourseName: "",
  };

  setModalIsOpen = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  onChangeNewCourseName = (e) => {
    this.setState({
      newCourseName: e.target.value,
    });
  };

  onSubmitEditCourseName = () => {
    const newName = {
      newCourseName: this.state.newCourseName,
    };
    axios
      .put(`/courses/${this.props.courseID}`, newName)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    this.props.filterDB();
  };

  render() {
    return (
      <>
        <button onClick={this.setModalIsOpen} className="edit-course">
          Edit Course Name
        </button>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.setModalIsOpen}
          style={{
            overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
            content: {
              borderRadius: "none",
              background: "white",
              top: "20%",
              bottom: "30%",
              left: "25%",
              right: "25%",
            },
          }}
        >
          <div className="new-course-name">
            <p style={{ textAlign: "center", fontSize: "22px" }}>
              New Course Name:{" "}
            </p>
            <input onChange={this.onChangeNewCourseName} required />
          </div>
          <div className="btn-group-edit-course-name">
            <input
              onClick={() => {
                this.setModalIsOpen();
                this.onSubmitEditCourseName();
                this.props.filterDB();
              }}
              className="btn-group-edit-course-nameb"
              type="submit"
              value="Save"
            />
            <button
              className="btn-group-edit-course-nameb"
              onClick={this.setModalIsOpen}
            >
              Cancel
            </button>
          </div>
          <button onClick={this.setModalIsOpen} className="x-btn-2">
            X
          </button>
        </Modal>
      </>
    );
  }
}

export default EditCourseName;

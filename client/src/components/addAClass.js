import React, { Component } from "react";
import Modal from "react-modal";
import "./addAClass.css";

class AddAClass extends Component {
  state = {
    openModal: false,
    courseName: "",
  };

  setOpenModal = () => {
    this.setState({
      openModal: !this.state.openModal,
      courseName: "",
    });
  };

  onChangeCourseName = (e) => {
    this.setState({
      courseName: e.target.value,
    });
  };

  onSubmitAdd = () => {
    for (let i = 0; i < this.props.courses.length; i++) {
      if (this.state.courseName === this.props.courses[i].courseName) {
        return alert("You already have a course under that name!");
      }
    }
    this.setOpenModal();
    this.props.addClassToDB(this.state.courseName);
    this.props.filterDB();
  };

  render() {
    return (
      <>
        <button onClick={this.setOpenModal} className="btn add">
          <div>Add a Course</div>
        </button>
        <Modal
          ariaHideApp={false}
          closeTimeoutMS={100}
          isOpen={this.state.openModal}
          onRequestClose={this.setOpenModal}
          shouldCloseOnOverlayClick={true}
          style={{
            overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
            content: {
              borderRadius: "none",
              border:"none",
              background: "#0B3954",
              boxShadow: "5px 5px 15px rgba(0,0,0,0.5)",
              top: "30%",
              bottom: "35%",
              left: "30%",
              right: "30%",
            },
          }}
        >
          <div style={{ color: "white", margin: "5px", fontSize: "25px", textAlign: "center" }}>
            Add a Course
          </div>
          <hr />
          <div className="add-class-form">
            <div>
              <div style={{color:"white"}}>Course Name<br/></div>
              <input onChange={this.onChangeCourseName} />
            </div>

            <div className="btn-group">
              <button
                onClick={() => {
                  this.onSubmitAdd();
                }}
              >
                Add
              </button>
              <button onClick={this.setOpenModal}>Cancel</button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default AddAClass;

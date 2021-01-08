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
    });
  };

  onChangeCourseName = (e) => {
    this.setState({
      courseName: e.target.value,
    });
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
              background: "#DDF2EB",
              boxShadow: "5px 5px 15px rgba(0,0,0,0.5)",
              top: "30%",
              bottom: "35%",
              left: "30%",
              right: "30%",
            },
          }}
        >
          <button className="close-button" onClick={this.setOpenModal}>
            X
          </button>
          <p style={{ margin: "5px", fontSize: "25px" }}>Add a Course: </p>
          <hr />
          <div className="add-class-form">
            <lablel>Course Name: </lablel>
            <br />
            <input onChange={this.onChangeCourseName} />
            <div className="btn-group">
              <button
                onClick={() => {
                  this.setOpenModal();
                  this.props.addClassToDB(this.state.courseName);
                  this.props.filterDB();
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

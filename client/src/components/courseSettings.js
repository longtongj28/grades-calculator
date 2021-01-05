// Modal that pops up after clicking on the settings button
// on any grade row from the grades page.

import React, { Component } from "react";
import Modal from "react-modal";
import { FcSettings } from "react-icons/fc";
import './courseSettings.css'
class CourseSettings extends Component {
  state = {
    modalIsOpen: false,
  };

  setModalIsOpen = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  render() {
    return (
      <>
        <FcSettings
          onClick={this.setModalIsOpen}
          title="Click to add scores and course categories"
          className="settings-icon"
        />
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.setModalIsOpen}
          style={{
            overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
            content: {
                background:"#F9DBBD"
            },
          }}
        >
          <button className="close-btn" onClick={this.setModalIsOpen}>X</button>
          <p>Get started by adding your course grade categories!</p>
        </Modal>
      </>
    );
  }
}

export default CourseSettings;

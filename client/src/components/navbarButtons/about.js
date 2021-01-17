import React, { Component } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import Modal from "react-modal";

class About extends Component {
  state = {
    aboutModalIsOpen: false,
  };

  setAboutModalIsOpen = () => {
    this.setState({
      aboutModalIsOpen: !this.state.aboutModalIsOpen,
    });
  };
  render() {
    return (
      <>
        <div
          className="nbar-btns"
          onClick={this.setAboutModalIsOpen}
          title="About"
        >
          <AiFillInfoCircle />
        </div>

        <Modal
          ariaHideApp={false}
          isOpen={this.state.aboutModalIsOpen}
          onRequestClose={this.setAboutModalIsOpen}
          style={{
            overlay: {
              background: "rgba(0,0,0,0.4)",
            },
            content: {
              background: "#4C5760",
              color: "white",
              boxShadow: "5px 5px 15px -2px rgba(0,0,0,0.3)",
              border: "none",
              borderRadius: "none",
              top: "20%",
              bottom: "20%",
              left: "35%",
              right: "35%",
            },
          }}
        >
          <div style={{ textAlign: "center", fontSize: "25px" }}>
            About Grades?
          </div>
          <hr />
          <br />
          <div style={{ fontSize: "20px", textAlign:"center" }}>
            A visual application where you can log grade data and automatically
            calculate overall course grades.
            <br />
            <br />
            Created by Johnson Tong, a CSUF student. <br />
            <br />
            Contact me: tong.johnson.28@gmail.com
          </div>
        </Modal>
      </>
    );
  }
}

export default About;

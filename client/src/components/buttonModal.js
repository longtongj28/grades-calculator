import React, { Component } from "react";
import Modal from "react-modal";
import "./buttonModal.css";
import axios from "axios";

class ButtonModal extends Component {
  state = {
    isOpen: false,
    showPassword: false,
    getOrPost: 0,
    allUsers: [],
  };

  setIsOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: this.props.username,
      password: this.props.password,
    };
    

    // login:get
    if (this.state.getOrPost === 0) {
      axios.get("/users").then((res) => {
        const data = res.data;
        this.setState({ allUsers: data });
        for (let i = 0; i < this.state.allUsers.length; i++) {
          if (this.state.allUsers[i].username === this.props.username) {
            if (this.state.allUsers[i].password === this.props.password) {
              // this.setState({ loginSuccess: true });
              this.props.handleLoginSuccess(true);
            } else {
              alert("Incorrect password.");
              break;
            }
            break;
          } else {
            alert("User does not exist! Please create an account.");
            this.resetForms();
            break;
          }
        }
      });

      // this.resetForms();
    }
    // create a new account: post
    else {
      if (
        this.props.username.length < 5 ||
        this.props.password.length < 5 ||
        this.props.username.length === 0 ||
        this.props.password === 0
      ) {
        alert("Your username and password must be 5 characters or more!");
        this.resetForms();
      }
      let unique = true;
      axios.get("/users").then((res) => {
        const data = res.data;
        this.setState({ allUsers: data });
        for (let i = 0; i < this.state.allUsers.length; i++) {
          if (this.state.allUsers[i].username === this.props.username) {
            unique = false;
            alert("User already exists!");
            // this.setState({ loginSuccess: false });
            this.props.handleLoginSuceess(false);
            this.resetForms();
          }
        }
      });
      if (unique) {
        axios
          .post("/users/create", newUser)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }

      this.resetForms();
    }
  };

  resetForms = () => {
    const ele = document.getElementsByClassName("field");
    for (let i = 0; i < ele.length; i++) ele[i].value = "";
  };

  toggleShowPassword = () => {
    if (!this.state.showPassword) {
      document.getElementsByClassName("passwordField")[0].type = "text";
      this.setState({ showPassword: !this.state.showPassword });
    } else
      document.getElementsByClassName("passwordField")[0].type = "password";
    this.setState({ showPassword: !this.state.showPassword });
  };

  setGETorPOST = () => {
    if (this.props.buttonText === "Log in") this.setState({ getOrPost: 0 });
    else this.setState({ getOrPost: 1 });
  };

  render() {
    return (
      <>
        <button
          onClick={() => {
            this.setIsOpen();
            this.setGETorPOST();
          }}
          className="logInOrSignUpBtns"
        >
          {this.props.buttonText}
        </button>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.isOpen}
          closeTimeoutMS={100}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.4)",
            },
            content: {
              boxShadow: "2px 2px 30px rgba(0,0,0,0.4)",
              background: "#363732",
              top: "25%",
              bottom: "25%",
              left: "35%",
              border: "none",
              right: "35%",
            },
          }}
          onRequestClose={this.setIsOpen}
        >
          <p className="title">{this.props.buttonText}</p>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div className="inputFields">
              <label>Username: </label>
              <input className="field" onChange={this.props.onChangeUsername} />
            </div>
            <div className="inputFields">
              <label>Password: &nbsp;</label>
              <input
                onChange={this.props.onChangePassword}
                className="field passwordField"
                type="password"
              ></input>
            </div>
            <div className="show-password">
              <label>Show Password</label>
              <input onChange={this.toggleShowPassword} type="checkbox" />
            </div>
            <input
              type="submit"
              className="enterPageButton"
              value={this.props.buttonText}
            />
          </form>
          <button className="closeButtonX" onClick={this.setIsOpen}>
            X
          </button>
        </Modal>
      </>
    );
  }
}
export default ButtonModal;

import React, { Component } from "react";
import Modal from "react-modal";
import "./buttonModal.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

const ConfirmPasswordField = (props) => {
  const show = props.getOrPost === 1 ? "block" : "none";
  return (
    <div
      style={{ display: show }}
      id="confirmField"
      className="inputFields confirm"
    >
      <label>Confirm Password:</label>
      <br />
      <input
        disabled={props.disabled}
        onChange={props.onChangeConfirmPassword}
        type="password"
        className="field passwordField confirm"
      ></input>
    </div>
  );
};

class ButtonModal extends Component {
  state = {
    isOpen: false,
    showPassword: false,
    getOrPost: 0,
    confirmPassword: "",
    allUsers: [],
    disabled: false,
    unique: false,
  };

  componentDidMount = () => {
    axios.get("/users").then((res) => {
      const data = res.data;
      this.setState({ allUsers: data });
    });
  };

  setIsOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  onChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };

  allowLogin = () => {
    //for login
    if (this.state.getOrPost === 0) {
      let found = false;
      for (let i = 0; i < this.state.allUsers.length; i++) {
        if (this.state.allUsers[i].username === this.props.username) {
          found = true;
          if (this.state.allUsers[i].password === this.props.password) {
            return true;
          } else {
            alert("Incorrect password.");
          }
        }
      }
      if (!found) {
        alert("User does not exist! Please create an account.");
      }
    } else if (this.state.getOrPost === 1) {
      console.log("got here");
      console.log("unique", this.state.unique);
      if (this.state.unique === true) {
        console.log("got here 2");
        return true;
      }
      else return false;
    }
    return false;
  };

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.getOrPost === 0) {
      this.officialUpdateToParent();
    }
    if (this.state.getOrPost === 1) {
      const newUser = {
        username: this.props.username,
        password: this.props.password,
      };
      if (
        this.props.username.length < 5 ||
        this.props.password.length < 5 ||
        this.props.username.length === 0 ||
        this.props.password === 0
      ) {
        alert("Your username and password must be 5 characters or more!");
        this.resetForms();
      }
      if (this.state.confirmPassword !== this.props.password) {
        let pfs = document.getElementsByClassName("passwordField");
        for (let i = 0; i < pfs.length; i++) {
          pfs[i].value = "";
        }
        alert("Passwords do not match.");
        this.props.handleLoginSuccess(false);
        return;
      }
      for (let i = 0; i < this.state.allUsers.length; i++) {
        if (this.state.allUsers[i].username === this.props.username) {
          alert("User already exists!");
          this.props.handleLoginSuccess(false);
          return;
        }
      }
      this.setState({
        unique: true,
      }, () => {
        console.log("unique set to true");
        this.officialUpdateToParent();
      });
      this.props.addNewUserDB(newUser);
      
    }
  };

  officialUpdateToParent = () => {
    if (this.allowLogin() === true) {
      this.toggleDisabled();
      this.props.handleLoginSuccess(true);
      setTimeout(() => {
        this.props.history.push("/grades");
      }, 2000);
      return;
    }
    return;
  };

  resetForms = () => {
    const ele = document.getElementsByClassName("field");
    for (let i = 0; i < ele.length; i++) ele[i].value = "";
    this.props.handleLoginSuccess(false);
  };

  toggleShowPassword = () => {
    let pfs = document.getElementsByClassName("passwordField");
    if (!this.state.showPassword) {
      for (let i = 0; i < pfs.length; i++) {
        pfs[i].type = "text";
      }
      this.setState({ showPassword: !this.state.showPassword });
    } else
      for (let i = 0; i < pfs.length; i++) {
        pfs[i].type = "password";
      }
    this.setState({ showPassword: !this.state.showPassword });
  };

  setGETorPOST = () => {
    if (this.props.buttonText === "Log in") this.setState({ getOrPost: 0 });
    else if (this.props.buttonText === "Create an Account")
      this.setState({ getOrPost: 1 });
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
              boxShadow: "2px 2px 30px rgba(0,0,0,0.5)",
              background: "#363732",
              top: "10%",
              bottom: "20%",
              left: "35%",
              border: "none",
              right: "35%",
            },
          }}
          onRequestClose={this.setIsOpen}
          shouldCloseOnOverlayClick={false}
        >
          <p className="title">{this.props.buttonText}</p>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div className="inputFields">
              <label>Username: </label>
              <br />
              <input
                disabled={this.state.disabled}
                className="field"
                onChange={this.props.onChangeUsername}
              />
            </div>
            <div className="inputFields">
              <label>Password:</label>
              <br />
              <input
                disabled={this.state.disabled}
                onChange={this.props.onChangePassword}
                className="field passwordField"
                type="password"
              ></input>
            </div>
            <ConfirmPasswordField
              disabled={this.state.disabled}
              onChangeConfirmPassword={this.onChangeConfirmPassword}
              getOrPost={this.state.getOrPost}
            />
            <div className="show-password">
              <label>Show Password</label>
              <input
                disabled={this.state.disabled}
                onChange={this.toggleShowPassword}
                type="checkbox"
              />
            </div>
            <input
              disabled={this.state.disabled}
              type="submit"
              className="enterPageButton"
              value={this.props.buttonText}
            />
          </form>
          <button
            disabled={this.state.disabled}
            className="closeButtonX"
            onClick={this.setIsOpen}
          >
            X
          </button>
        </Modal>
      </>
    );
  }
}
export default withRouter(ButtonModal);

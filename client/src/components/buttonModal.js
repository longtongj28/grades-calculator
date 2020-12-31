import React, { Component } from "react";
import Modal from "react-modal";
import "./buttonModal.css";
import axios from "axios";
import {withRouter} from'react-router-dom';

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
      if (this.state.confirmPassword !== this.props.password) {
        alert("Passwords do not match.");
        let pfs = document.getElementsByClassName("passwordField");
        for (let i = 0; i < pfs.length; i++) {
          pfs[i].value = "";
        }
      }
      let unique = true;
      axios.get("/users").then((res) => {
        const data = res.data;
        this.setState({ allUsers: data });
        for (let i = 0; i < this.state.allUsers.length; i++) {
          if (this.state.allUsers[i].username === this.props.username) {
            unique = false;
            alert("User already exists!");
            this.props.handleLoginSuccess(false);
            this.resetForms();
          }
        }
      });
      if (unique) {
        axios
          .post("/users/create", newUser)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
        this.handleLoginSuccess(true);
      }
    }
    // officially change the state of app if login was successful
    if (this.props.handleLoginSuccess){
      // const allFields = document.getElementsByClassName("inputFields");
      // while () {
      //   allFields[0].disp
      // }
      this.props.history.push('/grades');
    }
  };

  resetForms = () => {
    const ele = document.getElementsByClassName("field");
    for (let i = 0; i < ele.length; i++) ele[i].value = "";
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
              top: "10%",
              bottom: "20%",
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
              <br />
              <input className="field" onChange={this.props.onChangeUsername} />
            </div>
            <div className="inputFields">
              <label>Password:</label>
              <br />
              <input
                onChange={this.props.onChangePassword}
                className="field passwordField"
                type="password"
              ></input>
            </div>
            <ConfirmPasswordField
              onChangeConfirmPassword={this.onChangeConfirmPassword}
              getOrPost={this.state.getOrPost}
            />
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
export default withRouter(ButtonModal);

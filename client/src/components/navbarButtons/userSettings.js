import React, { Component } from "react";
import "./userSettings.css";
import { FaUsersCog } from "react-icons/fa";
import Modal from "react-modal";
import DeleteAccount from "./deleteAccount";
import axios from "axios";

class UserSettings extends Component {
  state = {
    userSettingsModalIsOpen: false,
    currentUsers: [],
    newUsername: "",
    currentPassField: "",
    newPass: "",
    confirmNewPass: "",
    showPassword: false,
  };

  setShowPassword = () => {
      this.setState({
          showPassword: !this.state.showPassword,
      })
  }
  componentDidMount = () => {
    this.loadUsers();
  };

  loadUsers = () => {
    axios.get("/users").then((res) => {
      let data = res.data;
      this.setState(
        {
          currentUsers: data,
        },
        () => {
          console.log(this.state.currentUsers);
        }
      );
    });
  };
  onChangeNewUsername = (e) => {
    this.setState({
      newUsername: e.target.value,
    });
  };

  onChangeCurrentPassField = (e) => {
    this.setState({
      currentPassField: e.target.value,
    });
  };

  onChangeNewPass = (e) => {
    this.setState({
      newPass: e.target.value,
    });
  };

  onChangeConfirmNewPass = (e) => {
    this.setState({
      confirmNewPass: e.target.value,
    });
  };
  setUserSettingsModalIsOpen = () => {
    this.setState({
      userSettingsModalIsOpen: !this.state.userSettingsModalIsOpen,
      newUsername: "",
      currentPassField: "",
      newPass: "",
      confirmNewPass: "",
    });
  };

  onSubmitChangePassword = () => {
    if (this.state.currentPassField !== this.props.password)
      return alert("Incorrect password.");
    if (this.state.newPass.length < 5)
      return alert("Please enter a new password of 5 characters or more.");
    if (this.state.newPass === this.props.password)
      return alert("Please create a unique password.");
    if (this.state.newPass !== this.state.confirmNewPass)
      return alert("New passwords don't match!");
    const newPasswordReq = {
      userID: this.props.userID,
      oldPassword: this.props.password,
      newPassword: this.state.newPass,
    };
    axios.put("/users/update_password", newPasswordReq);
    this.props.setPassword(this.state.newPass);
    const allPassfields = document.getElementsByClassName(
      "change-password-fields-inpt"
    );
    for (let i = 0; i < allPassfields.length; i++) {
      allPassfields[i].value = "";
    }
    alert("Password updated!");
  };

  onSubmitChangeUsername = () => {
    if (this.state.newUsername.length < 5)
      return alert("Please enter a new username of 5 characters or more.");
    for (let i = 0; i < this.state.currentUsers.length; i++) {
      if (this.state.currentUsers[i].username === this.state.newUsername)
        return alert("That user already exists!");
    }
    const newUsernameReq = {
      oldUsername: this.props.username,
      newUsername: this.state.newUsername,
      userID: this.props.userID,
    };
    axios.put("/users/update_username", newUsernameReq);
    this.loadUsers();
    this.props.officialUsername(this.state.newUsername);
    document.getElementsByClassName("new-username-field")[0].value = "";
    alert("Username updated!");
  };

  togglePasswordFields = () => {
      const allPassfields = document.getElementsByClassName("change-password-fields-inpt");
      if(!this.state.showPassword) {
          for (let i = 0; i < allPassfields.length; i++) {
              allPassfields[i].type ="text";
          }
          this.setShowPassword();
      }
      else {
          for (let i = 0; i < allPassfields.length; i ++ ) {
              allPassfields[i].type = "password";
          }
          this.setShowPassword();
      }

      
  }
  render() {
    return (
      <>
        <div
          className="nbar-btns"
          onClick={this.setUserSettingsModalIsOpen}
          title="User settings"
        >
          <FaUsersCog />
        </div>

        <Modal
          ariaHideApp={false}
          isOpen={this.state.userSettingsModalIsOpen}
          onRequestClose={this.setUserSettingsModalIsOpen}
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
              top: "5%",
              bottom: "10%",
              left: "28%",
              right: "28%",
            },
          }}
        >
          <div
            onClick={this.setUserSettingsModalIsOpen}
            className="close-btn-dlt-account"
          >
            X
          </div>
          <DeleteAccount {...this.props} />
          <div
            style={{ marginTop: "15px", textAlign: "center", fontSize: "25px" }}
          >
            User Settings
            <br />
          </div>
          <hr />
          <div style={{ textAlign: "center" }}>
            <div style={{ textAlign: "center", fontSize: "18px" }}>
              Change Username
            </div>
            <hr />
            <div style={{ marginBottom: "15px", textDecoration: "underline" }}>
              Current Username: {this.props.username}
            </div>
            <div>
              New Username: <br />
              <input
                className="new-username-field"
                onChange={this.onChangeNewUsername}
                style={{ textAlign: "center", width: "80%", fontSize: "18px" }}
              />
            </div>
            <button
              onClick={this.onSubmitChangeUsername}
              className="save-btn-user"
            >
              Save username
            </button>
            <hr />
          </div>

          <div className="change-password-fields">
            <div style={{ textAlign: "center", fontSize: "18px" }}>
              Change Password
            </div>
            <hr />
            <div>
              Type Current Password:
              <br />
              <input
                className="change-password-fields-inpt"
                type="password"
                onChange={this.onChangeCurrentPassField}
              />
            </div>
            <div>
              New Password:
              <br />
              <input
                className="change-password-fields-inpt"
                type="password"
                onChange={this.onChangeNewPass}
              />
            </div>
            <div>
              Confirm New Password:
              <br />
              <input
                className="change-password-fields-inpt"
                type="password"
                onChange={this.onChangeConfirmNewPass}
              />
            </div>
            <div className="show-password-settings">
              <div>Show Password</div>
              <input onChange={this.togglePasswordFields}id="checkbox" type="checkbox" />
            </div>
            <button
              onClick={this.onSubmitChangePassword}
              className="save-btn-user"
            >
              Save password
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

export default UserSettings;

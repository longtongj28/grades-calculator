import React, { Component } from "react";
import { BsTrashFill } from "react-icons/bs";
import Modal from "react-modal";
import "./deleteAccount.css";
import { withRouter } from "react-router-dom";

import axios from "axios";

class DeleteAccount extends Component {
  state = {
    deleteAccountModalIsOpen: false,
    confirm: "",
    redirect: false,
  };

  setDeleteAccountModalIsOpen = () => {
    this.setState({
      deleteAccountModalIsOpen: !this.state.deleteAccountModalIsOpen,
    });
  };
  onChangeConfirm = (e) => {
    this.setState({
      confirm: e.target.value,
    });
  };

  onSubmitDeleteAccount = () => {
    if (this.state.confirm !== "I understand")
      return alert(
        'Please type "I understand" to continue with deleting your account.'
      );
    axios.delete("/users", {
      data: {
        username: this.props.username,
        userID: this.props.userID,
      },
    });
    const field = document.getElementsByClassName("delete-account-confirm");
    field[0].disabled = true;
    
  };


  render() {
    return (
      <>
        <BsTrashFill
          onClick={this.setDeleteAccountModalIsOpen}
          title="Delete account"
          className="trash-btn"
        />
        <Modal
          ariaHideApp={false}
          isOpen={this.state.deleteAccountModalIsOpen}
          onRequestClose={this.setDeleteAccountModalIsOpen}
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
              top: "25%",
              bottom: "30%",
              left: "30%",
              right: "30%",
            },
          }}
        >
            <div className="close-btn-dlt-acc"onClick={this.setDeleteAccountModalIsOpen}>X</div>
          <div style={{ textAlign: "center", fontSize: "30px" }}>
            Delete Account
          </div>
          <hr />
          <p style={{ textAlign: "center" }}>
            Deleting your account is permanent!
            <br /> Type "I understand" before continuing.
          </p>
          <input
            className="delete-account-confirm"
            onChange={this.onChangeConfirm}
            style={{ width: "100%", textAlign: "center", fontSize: "20px" }}
          />
          <div className="delete-account-button-group">
            <a
              className="dlt-btns"
              href="/"
              onClick={this.onSubmitDeleteAccount}
            >
              Delete
            </a>
          </div>
        </Modal>
      </>
    );
  }
}

export default withRouter(DeleteAccount);

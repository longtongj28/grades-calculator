import React, { Component } from "react";
import "./intro.css";
import ButtonModal from "./buttonModal";

class Intro extends Component {
  // state = {
  //   username: this.props.username,
  //   password: this.props.username,
  //   loginSuccess: this.props.loginSuccess,
  // };

  // onChangeUsername = (e) => {
  //   this.setState({
  //     username: e.target.value,
  //   });
  // };

  // onChangePassword = (e) => {
  //   this.setState({
  //     password: e.target.value,
  //   });
  // };

  // handleLoginSuccess = (success) => {
  //   this.setState({ loginSuccess: success });
  // };

  render() {
    return (
      <>
        <div className="button-group">
          <ButtonModal
            username={this.props.username}
            onChangeUsername={this.props.onChangeUsername}
            password={this.props.password}
            onChangePassword={this.props.onChangePassword}
            loginSuccess={this.props.loginSuccess}
            handleLoginSuccess={this.props.handleLoginSuccess}
            buttonText="Log in"
          />
          <ButtonModal
            username={this.props.username}
            onChangeUsername={this.props.onChangeUsername}
            password={this.props.password}
            onChangePassword={this.props.onChangePassword}
            loginSuccess={this.props.loginSuccess}
            handleLoginSuccess={this.props.handleLoginSuccess}
            buttonText="Create an Account"
          />
        </div>
      </>
    );
  }
}

export default Intro;

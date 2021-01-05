import React, { Component } from "react";
import "./intro.css";
import ButtonModal from "./buttonModal";

class Intro extends Component {
  render() {
    return (
      <>
        <div className="button-group">
          <ButtonModal
            username={this.props.username}
            onChangeUsername={this.props.onChangeUsername}
            officialUsername={this.props.officialUsername}
            password={this.props.password}
            onChangePassword={this.props.onChangePassword}
            loginSuccess={this.props.loginSuccess}
            addNewUserDB={this.props.addNewUserDB}
            handleLoginSuccess={this.props.handleLoginSuccess}
            buttonText="Log in"
          />
          <ButtonModal
            history={this.props.history}
            username={this.props.username}
            onChangeUsername={this.props.onChangeUsername}
            officialUsername={this.props.officialUsername}
            password={this.props.password}
            addNewUserDB={this.props.addNewUserDB}
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

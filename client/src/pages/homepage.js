import React, { Component } from "react";
import AppNavbar from "../components/navbar";

import Intro from "../components/intro";

import AboutGrades from "../components/aboutGrades";
import "../components/homepageBack.css";

class Homepage extends Component {
  render() {
    return (
      <>
        <div className="homepageBackground">
          <AppNavbar />
          <Intro
            username={this.props.username}
            onChangeUsername={this.props.onChangeUsername}
            password={this.props.password}
            onChangePassword={this.props.onChangePassword}
            loginSuccess={this.props.loginSuccess}
            handleLoginSuccess={this.props.handleLoginSuccess}
          />
          <AboutGrades />
        </div>
      </>
    );
  }
}

export default Homepage;

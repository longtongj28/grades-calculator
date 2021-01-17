import React, { Component } from "react";
import AppNavbar from "../components/navbar";
import Intro from "../components/intro";
import "../components/homepageBack.css";

class Homepage extends Component {
  render() {
    return (
      <>
        <div className="homepageBackground">
          <AppNavbar />
          <Intro {...this.props} />
        </div>
      </>
    );
  }
}

export default Homepage;

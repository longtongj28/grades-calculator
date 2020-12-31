import React, { Component } from "react";
import AppNavbar from "../components/navbar";
import Intro from "../components/intro";
import AboutGrades from "../components/aboutGrades";
import "../components/homepageBack.css";

const Homepage = (props) => {
  return (
    <>
      <div className="homepageBackground">
        <AppNavbar />
        <Intro
          username={props.username}
          onChangeUsername={props.onChangeUsername}
          officialUsername={props.officialUsername}
          password={props.password}
          onChangePassword={props.onChangePassword}
          loginSuccess={props.loginSuccess}
          handleLoginSuccess={props.handleLoginSuccess}
        />
        <AboutGrades />
      </div>
    </>
  );
};

export default Homepage;

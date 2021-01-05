import React, { Component } from "react";
import "../components/homepageBack.css";
import GradesNavbar from "../components/gradesNav";
import "../components/navbar.css";
import GradeRows from "../components/gradeRows";

class GradesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: this.props.loginSuccess,
    };
  }

  componentDidMount = () => {
    console.log(this.props.loginSuccess);
    if (this.props.loginSuccess === true) {
      window.localStorage.setItem("loginSuccess", true);
      window.localStorage.setItem("username", this.props.username);
    }
  };
  render() {
    return (
      <>
        <div className="homepageBackground">
          <GradesNavbar
            username={this.props.username}
            handleLoginSuccess={this.props.handleLoginSuccess}
          />
          <GradeRows username={this.props.username} />
        </div>
      </>
    );
  }
}

export default GradesPage;

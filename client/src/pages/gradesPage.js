import React, { Component } from "react";
import "../components/homepageBack.css";
import GradesNavbar from "../components/gradesNav";
import "../components/navbar.css";
import GradeRows from "../components/gradeRows";
import axios from "axios";

class GradesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: this.props.loginSuccess,
    };
  }

  componentDidMount = () => {
    axios.get("/users").then((res) => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].username === this.props.username) {
          this.props.setUserID(data[i]._id);
        }
      }
    });
  };
  render() {
    return (
      <>
        <div className="homepageBackground">
          <GradesNavbar {...this.props} />
          <GradeRows
            officialUsername={this.props.officialUsername}
            username={this.props.username}
          />
        </div>
      </>
    );
  }
}

export default GradesPage;

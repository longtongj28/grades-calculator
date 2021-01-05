import React, { Component } from "react";
import axios from "axios";
import "./gradeRows.css";
import AddAClass from "./addAClass";
import CourseSettings from './courseSettings'


function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

class GradeRows extends Component {
  state = {
    totalGrade: "A+",
    courses: [], // [ class1: [ category: [assignments]...  ]]
    colorArray: [
      "#001427",
      "#61A0AF",
      "#9D5C63",
      "#303633",
      "#7EA2AA",
      "#136F63",
      "#586A6A",
      "#909580",
      "#C97C5D", 
      "#B36A5E",
      "#902923",
      "#932F6D",
      "#994636",
      "#D55672",
      "#14BDEB",
      "#AE8E1C",
      "#FF6700",
      "#14453D",
    ],
  };

  setCourses = (data) => {
    this.setState(
      {
        courses: data,
      },
      () => {
        console.log(this.state.courses);
      }
    );
  };

  filterDB = () => {
    //log all the courses in our database
    axios.get("/courses").then((res) => {
      let data = res.data;
      let userData = [];
      for (let i = 0; i < data.length; i++) {
        if (this.props.username === data[i].username) {
          userData.push(data[i]);
        }
      }
      this.setCourses(userData);
    });
  }

  shuffleColors = () => {
    this.setState({
      colorArray: shuffle(this.state.colorArray)
    });
  };

  componentDidMount = () => {
    this.filterDB();
    this.randomizeColors();
    this.shuffleColors();
  };

  randomizeColors = () => {
    this.shuffleColors();
    const allGradeRows = document.getElementsByClassName("grades-row");
    for (let i = 0; i < allGradeRows.length; i++) {
      allGradeRows[i].style.backgroundColor = this.state.colorArray[i]
    }
  };

  addClassToDB = (courseName) => {
    const newCourse = {
      username: this.props.username,
      courseName: courseName,
    };
    axios
      .post("/courses", newCourse)
      .then()
      .catch((err) => console.log(err));
  };

  calculateTotalGrade = () => {};

  render() {
    return (
      <>
        <div className="edit-bar">
          <AddAClass
            username={this.props.username}
            courses={this.state.courses}
            addClassToDB={this.addClassToDB}
            filterDB={this.filterDB}
          />
        {this.state.courses.length===0 && <div className="get-started">Get started by adding a course!</div>}
          <button onClick={this.randomizeColors} className="btn random-color">
            <div>Randomize Colors</div>
          </button>
        </div>
        <div className="grade-rows">
          {this.state.courses.map((course, i) => (
            <div
              className="grades-row"
              style={{
                display:"flex",
                position:"relative",
                color: "white",
                backgroundColor:this.state.colorArray[i]
              }}
              key={i}
            >
              <div className="course-title">{course.courseName}</div>
              <div className="total-grade">Grade: {this.state.totalGrade}</div>
              <CourseSettings/>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default GradeRows;

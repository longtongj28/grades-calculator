import React, { Component } from "react";
import CourseSettings from "./courseSettings";
import axios from "axios";

class CourseRow extends Component {
  state = {
    totalGrade: 100,
    categories: [],
    categoryGrades: [],
    allPercentWorth: [],
    serverCategories: [],
  };

  componentDidMount = () => {
    this.getCourseCategories();
    this.calculateTotalGrade();
  };
  setCategoryGrades = (grade) => {
    this.setState({
      categoryGrades: this.state.categoryGrades.concat(grade),
    });
  };

  setAllPercentWorth = (percentWorth) => {
    this.setState({
      allPercentWorth: this.state.allPercentWorth.concat(percentWorth),
    });
  };

  calculateTotalGrade = () => {
    this.setAllPercentWorth([]);
    this.setCategoryGrades([]);
    let allPercentWorth = [];
    for (let i = 0; i < this.state.categories.length; i++) {
      allPercentWorth.push(this.state.categories[i].percentWorth);
      axios.get(`/assignments/${this.state.categories[i]._id}`).then((res) => {
        let data = res.data;
        if (data.length > 0) {
          let num = 0;
          let denom = 0;
          for (let i = 0; i < data.length; i++) {
            num += data[i].scoreNum;
            denom += data[i].scoreDenom;
          }
          let average = (num / denom).toFixed(2);
          this.setCategoryGrades(average);
        } else this.setCategoryGrades(1);
        this.setState({
          allPercentWorth: allPercentWorth,
        });
        let total = 0;
        for (let i = 0; i < this.state.categories.length; i++) {
          total += this.state.categoryGrades[i] * this.state.allPercentWorth[i];
        }
        this.setState({
          totalGrade: total
        });
      });
    }
  };
  getCourseCategories = () => {
    this.setState({
      categoryGrades: [],
    });
    axios.get(`/courses/${this.props.courseID}`).then((res) => {
      let categories = [];
      let data = res.data;
      for (let i = 0; i < data.courseCategories.length; i++) {
        categories.push(data.courseCategories[i]);
      }
      this.setState({
        categories: categories,
      });
      this.calculateTotalGrade();
    });
    axios.get("/categories").then((res) => {
      const data = res.data;
      const serverCourseCats = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].courseID === this.props.courseID) {
          serverCourseCats.push(data[i]);
        }
      }
      this.setState({
        serverCategories: serverCourseCats,
      });
    });
  };
  addCategory = (newCatName, newPercWorth) => {
    const newCategory = {
      username: this.props.username,
      courseID: this.props.courseID,
      categoryName: newCatName,
      percentWorth: newPercWorth,
    };
    axios
      .post("/courses/category", newCategory)
      .then((res) => console.log(res));
    this.getCourseCategories();
  };

  render() {
    return (
      <>
        <div className="course-title">{this.props.courseName}</div>
        <div className="total-grade">Grade: {this.state.totalGrade.toFixed(2)}%</div>
        <CourseSettings
          {...this.props}
          totalGrade={this.state.totalGrade}
          categories={this.state.categories}
          addCategory={this.addCategory}
          getCourseCategories={this.getCourseCategories}
          serverCategories={this.state.serverCategories}
          categoryGrades={this.state.categoryGrades}
          setCategoryGrades={this.setCategoryGrades}
          allPercentWorth={this.state.allPercentWorth}
          setAllPercentWorth={this.setAllPercentWorth}
          courseName={this.props.courseName}
          username={this.props.username}
          courseID={this.props.courseID}
          deleteCourse={this.props.deleteCourse}
          filterDB={this.props.filterDB}
        />
      </>
    );
  }
}

export default CourseRow;

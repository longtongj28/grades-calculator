import React, { Component } from "react";
import EditCatDetails from "./editCatDetails";
import AssignmentDetails from "./assignmentDetails";
import axios from "axios";

class CategoryRow extends Component {
  state = {
    assignments: [],
    overallCategoryGrade: "...",
  };

  componentDidMount = () => {
    this.loadAssignments();
    this.calcOverallCategoryGrade();
  };
  setAssignments = (data) => {
    this.setState({
      assignments: data,
    });
    this.calcOverallCategoryGrade();
  };
  loadAssignments = () => {
    axios.get(`/assignments/${this.props.courseCategoryID}`).then((res) => {
      const data = res.data;
      this.setAssignments(data);
    });
  };
  calcOverallCategoryGrade = () => {
    let num = 0;
    let denom = 0;
    if (this.state.assignments.length > 0) {
      for (let i = 0; i < this.state.assignments.length; i++) {
        num += this.state.assignments[i].scoreNum;
        denom += this.state.assignments[i].scoreDenom;
      }

      let average = ((num / denom) * 100).toFixed(2);
      return this.setOverallCategoryGrade(average);
    }
    return this.setOverallCategoryGrade((100).toFixed(2));
  };

  setOverallCategoryGrade = (average) => {
    this.setState({
      overallCategoryGrade: average,
    });
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          position: "relative",
          color: "white",
          backgroundColor: this.props.backgroundColor,
        }}
        className="category-row"
      >
        <div className="category-name">{this.props.categoryName}</div>
        <div className="percent-worth">{this.props.percentWorth}%</div>
        <EditCatDetails
          {...this.props}
          categoryID={this.props.courseCategoryID}
          getCourseCategories={this.props.getCourseCategories}
          categories={this.props.categories}
          courseID={this.props.courseID}
          categoryName={this.props.categoryName}
          percentWorth={this.props.percentWorth}
        />
        <AssignmentDetails
          loadAssignments={this.loadAssignments}
          assignments={this.state.assignments}
          categoryName={this.props.categoryName}
          {...this.props}
          categoryID={this.props.courseCategoryID}
          overallCategoryGrade={this.state.overallCategoryGrade}
          calcOverallCategoryGrade={this.calcOverallCategoryGrade}
          getCourseCategories={this.props.getCourseCategories}
        />
        <div className="percent-of-category">
          {this.state.overallCategoryGrade}%
        </div>
      </div>
    );
  }
}

export default CategoryRow;

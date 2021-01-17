// Modal that pops up after clicking on the settings button
// on any grade row from the grades page.

import React, { Component } from "react";
import Modal from "react-modal";
import { FcSettings } from "react-icons/fc";

import "./courseSettings.css";
import AddCategory from "./addCategory";
import EditCourseName from "./editCourseName";
import ConfirmDelete from "./confirmDelete";

import { shuffle } from "./gradeRows";
import CategoryRow from "./categoryRow";

class CourseSettings extends Component {
  state = {
    modalIsOpen: false,
    empty: true,
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

  componentDidMount = () => {
    this.shuffleColors();
  };
  shuffleColors = () => {
    let shuffledColors = shuffle(this.state.colorArray);
    this.setState({
      colorArray: shuffledColors,
    });
  };
  
  setModalIsOpen = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };
  render() {
    return (
      <>
        <FcSettings
          onClick={() => {
            this.setModalIsOpen();
            this.shuffleColors();
            this.props.getCourseCategories();
          }}
          title="Click to add scores and course categories"
          className="settings-icon"
        />
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.setModalIsOpen}
          style={{
            overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
            content: {
              background: "#F9DBBD",
              border: "none",
              borderRadius:"none",
              top: "10%",
              bottom: "10%",
              left: "15%",
              right: "15%",
            },
          }}
        >
          <ConfirmDelete
            setModalIsOpen={this.setModalIsOpen}
            deleteCourse={this.props.deleteCourse}
            courseID={this.props.courseID}
            filterDB={this.props.filterDB}
          />
          <div className="top-right">
            <button className="close-btn" onClick={this.setModalIsOpen}>
              X
            </button>
          </div>
          <div className="center-bar">
            <AddCategory
              addCategory={this.props.addCategory}
              categories={this.props.categories}
              getCourseCategories={this.props.getCourseCategories}
            />

            <EditCourseName
              courseID={this.props.courseID}
              filterDB={this.props.filterDB}
            />
          </div>
          <div className="course-name">{this.props.courseName}</div>
          <hr />
          {this.props.categories.length === 0 && (
            <div className="get-startedMODAL">
              <p>
                Get started by adding your course grade categories and
                assignments!
              </p>
            </div>
          )}

          {this.props.categories.length > 0 && (
            <div className="category-rows">
              <div
                className="category-header"
                style={{ display: "flex", color: "white" }}
              >
                <div
                  style={{
                    textDecoration: "underline",
                    fontSize: "18px",
                    position: "absolute",
                    top: "10px",
                    left: "7%",
                  }}
                >
                  Category
                </div>
                <div
                  style={{
                    textDecoration: "underline",
                    fontSize: "18px",
                    position: "absolute",
                    top: "10px",
                    right: "25%",
                  }}
                >
                  Percent of Course Grade
                </div>
                <div className="category-grade-header">Category Grade</div>
              </div>
              <div style={{ marginTop: "35px" }}>
                {this.props.categories.map((category, i) => (
                  <CategoryRow
                    key={i}
                    {...this.props}
                    backgroundColor={this.state.colorArray[i]}
                    colorArray={this.state.colarArray}
                    courseID={this.props.courseID}
                    categories={this.props.categories}
                    getCourseCategories={this.props.getCourseCategories}
                    courseCategoryID={category._id}
                    serverCategories={this.props.serverCategories}
                    categoryName={category.categoryName}
                    percentWorth={category.percentWorth}
                  />
                ))}
              </div>
            </div>
          )}
          {this.props.categories.length > 0 && (
            <div className="overall-grade">Overall Grade: {this.props.totalGrade.toFixed(2)}%</div>
          )}
        </Modal>
      </>
    );
  }
}

export default CourseSettings;

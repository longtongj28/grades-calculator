// Modal that pops up after clicking on the settings button
// on any grade row from the grades page.

import React, { Component } from "react";
import Modal from "react-modal";
import { FcSettings } from "react-icons/fc";

import "./courseSettings.css";
import AddCategory from "./addCategory";
import EditCourseName from "./editCourseName";
import ConfirmDelete from "./confirmDelete";
import axios from "axios";

class CourseSettings extends Component {
  state = {
    modalIsOpen: false,
    categories: [],
    empty: true,
    colorArray: [
      "#994636",
      "#303633",
      "#586A6A",
      "#14453D",
      "#61A0AF",
      "#7EA2AA",
      "#D55672",
      "#14BDEB",
    ],
  };

  getCourseCategories = () => {
    axios.get(`/courses/${this.props.courseID}`).then((res) => {
      let categories = [];
      let data = res.data;
      for (let i = 0; i < data.courseCategories.length; i++) {
        categories.push(data.courseCategories[i]);
      }
      console.log(categories);
      this.setState(
        {
          categories: categories,
        },
        () => {
          console.log(this.state.categories);
        }
      );
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
            this.getCourseCategories();
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
              addCategory={this.addCategory}
              getCourseCategories={this.getCourseCategories}
            />
            <EditCourseName
              courseID={this.props.courseID}
              filterDB={this.props.filterDB}
            />
          </div>
          <div className="course-name">{this.props.courseName}</div>
          <hr />
          {this.state.categories.length === 0 && (
            <div className="get-startedMODAL">
              <p>
                Get started by adding your course grade categories and
                assignments!
              </p>
            </div>
          )}
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
                  left: "5%",
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
                  right: "3%",
                }}
              >
                Percent of Course Grade
              </div>
            </div>
            <div style={{ marginTop: "35px" }}>
              {this.state.categories.map((category, i) => (
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    color: "white",
                    backgroundColor: this.state.colorArray[i],
                  }}
                  className="category-row"
                  key={i}
                >
                  <div className="category-name">{category.categoryName}</div>
                  <div className="percent-worth">{category.percentWorth}%</div>
                </div>
              ))}
            </div>
          </div>
          <div className="overall-grade">Overall Grade:</div>
        </Modal>
      </>
    );
  }
}

export default CourseSettings;

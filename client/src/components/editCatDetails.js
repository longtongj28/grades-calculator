import React, { Component } from "react";
import Modal from "react-modal";
import "./editCatDetails.css";

import axios from "axios";
import DeleteCategory from "./deleteCategory";

class EditCatDetails extends Component {
  state = {
    ECDModalIsOpen: false,
    newCategoryName: "",
    newCategoryPercent: "",
  };

  onChangeNewCategoryName = (e) => {
    this.setState({
      newCategoryName: e.target.value,
    });
  };

  onChangeNewCategoryPercent = (e) => {
    this.setState({
      newCategoryPercent: e.target.value,
    });
  };
  setECDModalIsOpen = () => {
    this.setState({
      ECDModalIsOpen: !this.state.ECDModalIsOpen,
      newCategoryName: "",
      newCategoryPercent: "",
    });
  };

  onSubmitEditDets = () => {
    if (this.state.newCategoryPercent < 0)
      return alert("Cannot use negative percentage values!");
    if (
      this.state.newCategoryName.length === 0 ||
      this.state.newCategoryPercent.length === 0
    )
      return alert("Please enter all the details!");
    for (let i = 0; i < this.props.categories.length; i++) {
      if (
        this.props.categories[i].categoryName === this.state.newCategoryName
      ) {
        return alert("That category name already exists!");
      }

      const newDetails = {
        courseID: this.props.courseID,
        categoryName: this.props.categoryName,
        newCategoryName: this.state.newCategoryName,
        newPercentWorth: this.state.newCategoryPercent,
        categoryID: this.props.categoryID,
      };
      axios.put("/categories", newDetails).then();

      this.props.getCourseCategories();
      this.setECDModalIsOpen();
    }
  };
  render() {
    return (
      <>
        <button onClick={this.setECDModalIsOpen} className="edit-category-btn">
          Edit Details
        </button>
        <Modal
          isOpen={this.state.ECDModalIsOpen}
          ariaHideApp={false}
          onRequestClose={this.setECDModalIsOpen}
          style={{
            overlay: {
              background: "rgba(0,0,0,0.3)",
            },
            content: {
              top: "20%",
              bottom: "20%",
              left: "20%",
              right: "20%",
            },
          }}
        >
          <DeleteCategory
            getCourseCategories={this.props.getCourseCategories}
            setECDModalIsOpen={this.setECDModalIsOpen}
            courseID={this.props.courseID}
            categoryName={this.props.categoryName}
            categoryID={this.props.categoryID}
          />
          <div className="category-name-title">
            Details for Category {this.props.categoryName}
            <hr />
          </div>

          <div onClick={this.setECDModalIsOpen} className="close-btn-editCat">
            X
          </div>
          <div className="cat-details">
            <div className="cat-detail-lbl">
              <div className="cat-details-current">
                Current Category Name: {this.props.categoryName}
              </div>
              <div className="change-input">
                Change Category Name to: <br />
                <input onChange={this.onChangeNewCategoryName} />
              </div>
            </div>
            <hr />
            <div className="cat-detail-lbl">
              <div className="cat-details-current">
                Current Percentage of Course Grade: {this.props.percentWorth}%
              </div>
              <div className="change-input">
                Change Percentage to: <br />
                <input
                  onChange={this.onChangeNewCategoryPercent}
                  type="number"
                  min="0"
                />
              </div>
            </div>
          </div>
          <div className="edit-cat-details-btn-group">
            <button
              onClick={() => {
                this.onSubmitEditDets();
                this.props.getCourseCategories();
              }}
            >
              Save
            </button>
            <button onClick={this.setECDModalIsOpen}>Cancel</button>
          </div>
        </Modal>
      </>
    );
  }
}

export default EditCatDetails;

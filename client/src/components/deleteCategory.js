import axios from "axios";
import React, { Component } from "react";
import { BsTrashFill } from "react-icons/bs";
import Modal from "react-modal";
import "./deleteCategory.css";

class DeleteCategory extends Component {
  state = {
    dltModalIsOpen: false,
  };

  setDltModalIsOpen = () => {
    this.setState({
      dltModalIsOpen: !this.state.dltModalIsOpen,
    });
  };

  onSubmitDeleteCategory = () => {
    axios
      .delete("/categories", {
        data: {
          courseID: this.props.courseID,
          categoryID: this.props.categoryID,
        },
      })
      .then((res) => console.log(res));
    this.setDltModalIsOpen();
    this.props.setECDModalIsOpen();
    this.props.getCourseCategories();
  };
  render() {
    return (
      <>
        <BsTrashFill
          onClick={this.setDltModalIsOpen}
          title="Delete category"
          className="trash-btn"
        />
        <Modal
          isOpen={this.state.dltModalIsOpen}
          onRequestClose={this.setDltModalIsOpen}
          ariaHideApp={false}
          style={{
            overlay: {
              background: "rgba(0,0,0,0.3)",
            },
            content: {
              top: "25%",
              bottom: "30%",
              left: "30%",
              right: "30%",
            },
          }}
        >
          <div className="are-you-sure">
            Are you sure you want to delete this category?
          </div>
          <div className="dl-cat-btn-group">
            <button
              onClick={() => {
                this.onSubmitDeleteCategory();
                this.props.getCourseCategories();
              }}
            >
              Delete
            </button>
            <button onClick={this.setDltModalIsOpen}>Cancel</button>

          </div>
        </Modal>
      </>
    );
  }
}

export default DeleteCategory;

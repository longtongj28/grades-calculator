import React, { Component } from "react";
import Modal from "react-modal";
import "./addCategory.css";

class AddCategory extends Component {
  state = {
    modalIsOpen: false,
    newCategoryName: "",
    newCategoryPWorth: 0,
  };

  setModalIsOpen = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  onChangeCName = (e) => {
    this.setState({
      newCategoryName: e.target.value,
    });
  };

  onChangeCPW = (e) => {
    this.setState({
      newCategoryPWorth: e.target.value,
    });
  };

  onSubmitCInfo = (e) => {
    e.preventDefault();

    if (this.state.newCategoryName.length === 0) return alert("Please enter a category name.")
    this.props.addCategory(
      this.state.newCategoryName,
      this.state.newCategoryPWorth
    );
    this.setModalIsOpen();
    this.props.getCourseCategories();
  };
  render() {
    return (
      <>
        <button
          onClick={() => {
            this.setModalIsOpen();
          }}
          className="add-category"
        >
          Add Category
        </button>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.setModalIsOpen}
          style={{
            overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
            content: {
              borderRadius: "none",
              background: "white",
              top: "20%",
              bottom: "30%",
              left: "20%",
              right: "20%",
            },
          }}
        >
          <button className="x-btn-1" onClick={this.setModalIsOpen}>
            X
          </button>
          <div className="cInfo">
            <div className="input-groups-1">
              <div className="cName-label">
                Category Name: <br />
              </div>
              <input onChange={this.onChangeCName} className="cName-input" />
            </div>
            <div className="input-groups-1">
              <div className="cName-label">
                Percent Worth: <br />
              </div>
              <input
                onChange={this.onChangeCPW}
                type="number"
                min="0"
                className="cName-input"
              />
            </div>
          </div>
          <form onSubmit={this.onSubmitCInfo} className="cName-modal-btns">
            <input
              className="add-category-modal-btns"
              type="submit"
              value="Add Category"
            />
            <button
              className="add-category-modal-btns"
              onClick={this.setModalIsOpen}
            >
              Cancel
            </button>
          </form>
        </Modal>
      </>
    );
  }
}

export default AddCategory;

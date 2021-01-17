import React, { Component } from "react";
import "./navbar.css";
import { AiFillGithub } from "react-icons/ai";
import { MdExitToApp } from "react-icons/md";
import About from "./navbarButtons/about";
import UserSettings from "./navbarButtons/userSettings";

class GradesNavbar extends Component {
  state = {};

  render() {
    return (
      <div className="nbar">
        <p className="siteName">{this.props.username}'s Grades</p>
        <div className="links">
          <ul>
            <li>
              <a
                className="nbar-btns"
                title="Web App's Github Repo"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/longtongj28/grades-calculator"
              >
                <AiFillGithub />
              </a>
            </li>
            <li>
              <About />
            </li>
            <li>
              <UserSettings {...this.props}/>
            </li>
            <li>
              <a className="nbar-btns" title="Log out" href="/">
                <MdExitToApp />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default GradesNavbar;

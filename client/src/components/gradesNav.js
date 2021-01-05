import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import "./navbar.css";
import { AiFillGithub } from "react-icons/ai";
import { MdExitToApp } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { AiFillQuestionCircle, AiFillInfoCircle } from "react-icons/ai";

class GradesNavbar extends Component {
  state = {};

  render() {
    return (
      <div className="nbar">
        <p className="siteName">
          {this.props.username}'s Grades
        </p>
        <div className="links">
          <ul>
            <li>
              <a
                title="Web App's Github Repo"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/longtongj28/grades-calculator"
              >
                <AiFillGithub />
              </a>
            </li>
            <li>
              <a title="About">
                <AiFillInfoCircle />
              </a>
            </li>
            <li>
              <a title="How to use?">
                <AiFillQuestionCircle />
              </a>
            </li>
            <li>
              <a title="User settings">
                <FaUsersCog />
              </a>
            </li>
            <li>
              <a title="Log out" href="/">
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

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import "./navbar.css";
import { AiFillGithub, AiFillInfoCircle } from "react-icons/ai";

class AppNavbar extends Component {
  render() {
    return (
      <div className="nbar">
        <p className="siteName">
          Grades?
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
          </ul>
        </div>
      </div>
    );
  }
}

export default AppNavbar;

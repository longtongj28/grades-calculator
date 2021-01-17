import React, { Component } from "react";
import "./navbar.css";
import { AiFillGithub } from "react-icons/ai";
import About from "./navbarButtons/about";

class AppNavbar extends Component {
  render() {
    return (
      <div className="nbar">
        <p className="siteName">Grades?</p>
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
              <About/>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AppNavbar;

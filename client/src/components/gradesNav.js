import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import "./navbar.css";

class GradesNavbar extends Component {
  state = {
    
  };

  

  render() {
    return (
      <div className="nbar">
        <h3 className="siteName"><button>{this.props.username}'s Grades</button></h3>
        <div className="links">
          <ul>
            <li>
              <button>Github</button>
            </li>
            <li>
              <button>Settings</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default GradesNavbar;

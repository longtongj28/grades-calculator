import React, { useState, useEffect, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import "./navbar.css";

class AppNavbar extends Component {
  state = {
    
  };

  

  render() {
    return (
      <div className="nbar">
        <h3 className="siteName"><button>Grades?</button></h3>
        <div className="links">
          <ul>
            <li>
              <button>Github</button>
            </li>
            <li>
              <button>About</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AppNavbar;

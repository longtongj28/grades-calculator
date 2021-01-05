import "./App.css";
import React, { Component } from "react";
import Homepage from "./pages/homepage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import GradesPage from "./pages/gradesPage";
import axios from "axios";

class App extends Component {
  state = {
    username: "",
    password: "",
    loginSuccess: false,
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  officialUsername = (username) => {
    this.setState({
      username: username,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  addNewUserDB = (newUser) => {
    console.log("add user called");
    axios
      .post("/users/create", newUser)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    this.handleLoginSuccess(true);
  };

  handleLoginSuccess = (success) => {
    this.setState({ loginSuccess: success });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              exact
              render={() => (
                <Homepage
                  username={this.state.username}
                  onChangeUsername={this.onChangeUsername}
                  officialUsername={this.officialUsername}
                  password={this.state.password}
                  onChangePassword={this.onChangePassword}
                  loginSuccess={this.state.loginSuccess}
                  addNewUserDB={this.addNewUserDB}
                  handleLoginSuccess={this.handleLoginSuccess}
                />
              )}
            />
            {this.state.loginSuccess && (
              <Route
                exact
                path="/grades"
                exact
                render={() => (
                  <GradesPage
                    username={this.state.username}
                    loginSuccess={this.state.loginSuccess}
                    handleLoginSuccess={this.handleLoginSuccess}
                  />
                )}
              />
            )}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

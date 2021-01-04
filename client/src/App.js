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

class App extends Component {
  state = {
    username: "johnson",
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
                  handleLoginSuccess={this.handleLoginSuccess}
                />
              )}
            />
            <Route
              path="/grades"
              exact
              render={() => (
                <GradesPage
                  username={this.state.username}
                  loginSuccess={this.state.loginSuccess}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

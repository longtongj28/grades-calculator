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
import GradePage from "./pages/gradesPage";

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

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLoginSuccess = (success) => {
    this.setState({ loginSuccess: success });
    console.log(this.state.loginSuccess);
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={ () => (
                <Homepage
                  username={this.state.username}
                  onChangeUsername={this.onChangeUsername}
                  password={this.state.password}
                  onChangePassword={this.onChangePassword}
                  loginSuccess={this.state.loginSuccess}
                  handleLoginSuccess={this.handleLoginSuccess}
                />
              )}
            />
            <Route path="/grades" exact component={GradePage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

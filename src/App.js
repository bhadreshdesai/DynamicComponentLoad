import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import DynamicComponentLoader from "./DynamicComponentLoader";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "C1", comp: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClick() {
    let newState = { ...this.state, comp: this.state.value };
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <div>Dynamic Components</div>
        <p />
        <div>
          <label>
            Component Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <button onClick={this.handleClick}>Load</button>
          <p />
          {this.state.comp && (
            <DynamicComponentLoader
              location={{ pathname: "/component/" + this.state.comp }}
            />
          )}
        </div>
        <p />
        <BrowserRouter>
          <ul>
            <li>
              <Link to="/component/C1">C1</Link>
            </li>
            <li>
              <Link to="/component/C2">C2</Link>
            </li>
            <li>
              <Link to="/component/C3">C3</Link>
            </li>
          </ul>
          <Route path="/component/" component={DynamicComponentLoader} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

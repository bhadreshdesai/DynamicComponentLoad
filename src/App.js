import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import DynamicComponentLoader from "./components/DynamicComponentLoader";

function DynamicRoute() {
  return <Route path="/component" component={DynamicComponentLoader} />;
}

function App() {
  return (
    <div>
      <div>Dynamic Components</div>
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/component/C1">C1</Link>
          </li>
          <li>
            <Link to="/component/C2">C2</Link>
          </li>
        </ul>
        <DynamicRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { Component } from "react";
import { Route, Redirect, NavLink, HashRouter } from "react-router-dom";
import { IndexCustomer } from "./components/indexCustomer"
import { WorkerPage } from "./components/WorkerPage"
import { ManagerPage } from "./components/ManagerPage"

class App extends Component {
  render() {
    return (
      <div id="shutterGutterApp">
        <HashRouter>
          <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="navbar-header">
                  <div className="navbar-brand">BuildApp pwd by: Nyb</div>
                </div>
                <ul className="nav navbar-nav">
                  <li>
                    <NavLink to="/customer" activeClassName="active-nav-link">Enter Customer page</NavLink>
                  </li>
                   <li>
                      <NavLink to="/manager" activeClassName="active-nav-link">ManagerRoot page</NavLink>
                   </li>
                  <li>
                    <NavLink to="/worker" activeClassName="active-nav-link">WorkerRoot page</NavLink>
                  </li>

                </ul>
            </nav>


            <Route path="/" exact render={() => (<Redirect to="/customer" />)} />
            <Route path="/customer" component={IndexCustomer} />
            <Route path="/worker" component={WorkerPage} />
            <Route path="/manager" component={ManagerPage} />

          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;

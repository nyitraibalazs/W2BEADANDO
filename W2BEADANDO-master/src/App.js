import React, { Component } from "react";
import { Route, Redirect, NavLink, HashRouter } from "react-router-dom";
import { CustomerPage } from "./client/componens/customer/CustomerPage"
import { WorkerPage } from "./client/componens/worker/WorkerComponens"
import { ManagerPage } from "./client/componens/manager/ManagerPage"

class App extends Component {
   render() {
      return (
         <div>
            <HashRouter>
               <div>
                  <nav className="navbar navbar-dark bg-default navbar-expand-lg">
                     <div className="container-fluid">
                        <div className="navbar-header">
                           <div className="navbar-brand">Nyitrai Balázs</div>
                        </div>
                        <ul className="nav navbar-nav">
                           <li>
                              <NavLink to="/customer" activeClassName="active-nav-link">Costumer page</NavLink>
                           </li>
                           <li>
                              <NavLink to="/worker" activeClassName="active-nav-link">Worker page</NavLink>
                           </li>
                           <li>
                              <NavLink to="/manager" activeClassName="active-nav-link">Manager page</NavLink>
                           </li>
                        </ul>
                     </div>
                  </nav>


                  <Route path="/" exact render={() => (<Redirect to="/customer" />)} />
                  <Route path="/customer" component={CustomerPage} />
                  <Route path="/worker" component={WorkerPage} />
                  <Route path="/manager" component={ManagerPage} />

               </div>
            </HashRouter>
         </div>
      );
   }
}

export default App;

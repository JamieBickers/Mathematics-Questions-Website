import * as React from 'react';
import {Quadratic} from './QuadraticEquations';
import {Home} from './Home';
import {Simultaneous} from './SimultaneousEquations';
import {SendAllWorksheets} from './SendAllWorksheets'
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'

export const Menu = () =>
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/quadraticEquations">Quadratic Equations</Link></li>
        <li><Link to="/simultaneousEquations">Simultaneous Equations</Link></li>
        <li><Link to="/sendAllWorksheets">Send All Worksheets</Link></li>
      </ul>
      <Route exact path="/"  component={Home}/>
      <Route path="/quadraticEquations" component={Quadratic} />
      <Route path="/simultaneousEquations" component={Simultaneous} />
      <Route path="/sendAllWorksheets" component={SendAllWorksheets} />
    </div>
  </Router>

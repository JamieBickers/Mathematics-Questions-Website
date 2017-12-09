import * as React from 'react';
import {Quadratic} from './QuadraticEquations';
import {Home} from './Home';
import {Simultaneous} from './SimultaneousEquations';
import {SendAllWorksheets} from './SendAllWorksheets'
import styled from 'styled-components'
import {MenuColour} from '../StyleConstants'
import {ApiDocumentation} from './ApiDocumentation';
import {FourOhFour} from './FourOhFour';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'

const routes = [
  { path: '/',
    exact: true,
    main: () => <Home />
  },
  { path: '/quadraticEquations',
  exact: false,
    main: () => <Quadratic />
  },
  { path: '/simultaneousEquations',
    exact: false,
    main: () => <Simultaneous />
  },
  { path: '/sendAllWorksheets',
    exact: false,
    main: () => <SendAllWorksheets />
  },
  { path: '/apiDocumentation',
    exact: false,
    main: () => <ApiDocumentation />
  }
]

export const Menu = () => (
  <Router>
    <div style={{ display: 'flex' }}>
      <Div>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/quadraticEquations">Quadratic Equations</Link></li>
          <li><Link to="/simultaneousEquations">Simultaneous Equations</Link></li>
          <li><Link to="/sendAllWorksheets">Send All Worksheets</Link></li>
          <li><Link to="/apiDocumentation">Api Documentation</Link></li>
        </ul>

        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
          />
        ))}
      </Div>

      <div style={{ flex: 1, padding: '10px' }}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
          <Route component={FourOhFour}/>
        </Switch>
      </div>
    </div>
  </Router>
)

const Div = styled.div`
  width: 15%;
  padding: 10px;
  background: ${MenuColour};
  height: 100%;
  position: fixed;
  border-radius: 10px;
`

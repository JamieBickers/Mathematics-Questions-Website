
import * as React from 'react';
import { Component } from 'react';
import { Menu } from './components/Menu'
import styled from 'styled-components'
import {Title} from './components/StyledComponents'

class App extends Component {
  render() {
    return (
      <Div>
        <Div>
          <Title>Title Here</Title>
        </Div>
        <Menu />
      </Div>
    );
  }
}

export default App;

const Div = styled.div`
  margin: 0px;
  padding: 0px;
  margin-top: 0px;
`

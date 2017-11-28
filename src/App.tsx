
import * as React from 'react';
import { Component } from 'react';
import { Menu } from './components/Menu'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Title Here</h2>
        </div>
        <Menu />
      </div>
    );
  }
}

export default App;

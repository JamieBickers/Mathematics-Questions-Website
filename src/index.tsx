import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import styled from 'styled-components'

const SApp = styled(App)`
  margin: 0px;
  padding: 0px;
  margin-top: 0px;
`

ReactDOM.render(
  <SApp />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

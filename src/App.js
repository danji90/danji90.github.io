import 'react-app-polyfill/stable';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import './App.css';

import Portfolio from './components/Portfolio/Portfolio';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Portfolio />
      </ThemeProvider>
    </div>
  );
}

export default App;

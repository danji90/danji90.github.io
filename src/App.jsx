import 'react-app-polyfill/stable';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from './theme';
import './App.css';

import Portfolio from './Pages/Portfolio';
import PedalTrips from './Pages/PedalTrips';

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <HashRouter>
            <Routes>
              <Route exact path="/" element={<Portfolio />} />
              <Route path="/pedaltrips" element={<PedalTrips />} />
            </Routes>
          </HashRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;

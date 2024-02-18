/* eslint-disable no-unused-vars */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import './index.css';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App';
import getStore from './model/store';

const container = document.getElementById('app');
const root = createRoot(container);
const store = getStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

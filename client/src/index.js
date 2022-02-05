import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RouterContextProvider } from './store/Router-context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <RouterContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RouterContextProvider>,
  document.getElementById('root')
);

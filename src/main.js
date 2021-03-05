import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import { DEFAULT_TITLE } from './app/app.const';
import './styles/main.scss';

document.title = DEFAULT_TITLE;
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);

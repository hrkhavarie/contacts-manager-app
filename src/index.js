import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from  'react-router-dom'
import App from './App';
// // Bootstrap
// import 'bootstrap/dist/css/bootstrap.css'
// import  'bootstrap/dist/js/bootstrap'
import './index.css';
import "react-confirm-alert/src/react-confirm-alert.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>

  </React.StrictMode>
);


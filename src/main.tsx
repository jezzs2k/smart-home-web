import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import './config/firebase';

import store from '../src/stores/stores';
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

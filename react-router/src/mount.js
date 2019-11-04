import "core-js/es6";
import 'raf/polyfill';

import ReactDOM from 'react-dom'
import React from 'react';
import App from "./app";
import 'STYLES/reset.scss';
import 'STYLES/common.css';


const rootEl = document.getElementById('container');
ReactDOM.render(<App/>, rootEl);
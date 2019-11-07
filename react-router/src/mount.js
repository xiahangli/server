import "core-js/es6";
import 'raf/polyfill';

import ReactDOM from 'react-dom';
import React from 'react';
import App from "./app";
import 'styles/reset.scss';
import 'styles/common.css';


const rootEl = document.getElementById('container');
ReactDOM.render(<App/>, rootEl);
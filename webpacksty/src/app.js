import React from "react";
import {HashRouter} from "react-router-dom";
import Main from "./router/Main";
import {Provider} from "react-redux";
import configureStore from "./store/configStore";

// let baseURL = '';
// const env = process.env.NODE_ENV;
// if (env === 'development') {
//     baseURL = 'https://evaluation.leke.cn';
// }

const store = configureStore();
if (window.location.href.indexOf('haveRead') > -1) {
    window.location.hash = '#/haveRead';
}

const App = props => <Provider store={store}>
    <HashRouter>
        <Main />
    </HashRouter>
</Provider>;
export default App;
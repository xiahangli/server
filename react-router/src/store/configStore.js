import thunk from 'redux-thunk'; // redux 作异步处理方案
import {
    createStore,
    compose,
    applyMiddleware
} from 'redux'; // 引入redux createStore、中间件及compose

import reducer from './reducers'; // 引入reducers集合

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configStore() {
    // 创建一个中间件集合
    const middleware = [thunk]; 
    
    //创建store
    const store = createStore(
        reducer, 
        composeEnhancers(applyMiddleware(middleware))
    );
    // if (module.hot) {
    //     module.hot.accept('../modules/index.js', () =>
    //         store.replaceReducer(require('../modules/index.js').default)
    //     );
    // }

    return store;
}
// ,
// process.env.NODE_ENV==='development'&&require('../utils/devTools/index.js').default.instrument(),//开发环境引入redux-devtools （ctrl+h开启/隐藏）

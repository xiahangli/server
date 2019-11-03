//处理异步的中间件
import Actions from "./actions";

export default class Middleware {
    // Signin Functions Starts
    static setNormal() {
        return dispatch => {
            dispatch(Actions.getNormal());
        };
    }

    static signin(credentials) {
        return (dispatch, getState) => {
            dispatch(Actions.getSignin());
            console.log('查看state', getState());
            Middleware.signinWithCredentials(dispatch, credentials);
        };
    }

    static signinWithCredentials(dispatch, credentials) {
        //模拟一个请求的过程
        let timer = setTimeout(() => {
            clearTimeout(timer);
            const luckey = Math.random();
            if (luckey < 0.5){
                dispatch(Actions.successful(credentials));
                return;
            }
            dispatch(Actions.failed());
        }, 1500);
    }
}

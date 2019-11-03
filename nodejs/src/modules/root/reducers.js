import Actions from "./actions";
const INITIAL_STATE = {
    title: "来自redux的默认标题",
    isNormal: false,
    isSignin: false,
    successful: false,
    failed: false,
    userInfo: null
};
const root = (state = INITIAL_STATE, action) => {
    console.log('state', state);
    switch (action.type) {
        case Actions.NORMAL:
            return {
                ...INITIAL_STATE,
                isNormal: true,
            };
        case Actions.SINGIN:
            return {
                ...state,
                isSignin: true
            };
        case Actions.SUCCESSFUL:
            return {
                ...state,
                isSignin: false,
                successful: true,
                userInfo: action.userInfo
            };
        case Actions.FAILED:
            return {
                ...state,
                isSignin: false,
                failed: true,
            };
        default:
            return state;
    }
};

export default root;

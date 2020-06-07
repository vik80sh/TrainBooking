
import { LOGIN, LOGOUT, ADMINLOGIN } from './../ReactAction/index';

let loginState = {
    token: "",
    name: "",
    isLogin: false,
    isAdmin: false
}

const loggedReducer = (state = loginState, action) => {
    switch (action.type) {
        case LOGIN:
            loginState = {
                token: action.payload.token,
                name: action.payload.name,
                isLogin: true,
                isAdmin: false
            }
            return loginState;
        case ADMINLOGIN:
            loginState = {
                token: action.payload.token,
                name: action.payload.name,
                isLogin: true,
                isAdmin: true
            }
            return loginState;
        case LOGOUT:
            loginState = {
                token: "",
                name: "",
                isLogin: false,
                isAdmin: false
            }
            return loginState;

        default:
            return state;
    }
}

export default loggedReducer;
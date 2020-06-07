import counterReducer from'./counter';
import loggedReducer from './isLogged';
import {combineReducers} from 'redux';


const allReducers = combineReducers({
    loginReducer:loggedReducer
})

export default allReducers;
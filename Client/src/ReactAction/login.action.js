import { LOGIN,LOGOUT,ADMINLOGIN } from './index';

export const loginAction = (data) =>dispatch=>{
    return dispatch({
        type: LOGIN,
        payload: data
      });
} 

export const logOutAction = () =>dispatch=>{
    return dispatch({
        type: LOGOUT,
        payload: ""
      });
} 
export const adminLogin = (data) =>dispatch=>{
  return dispatch({
      type: ADMINLOGIN,
      payload: data
    });
} 


import { LOGIN_DATA } from '../actions/types';

const initialState = [];

export default function Login(state = initialState,action) {
  const {type,payload} = action;
  switch(type) {
     case LOGIN_DATA:
      return {
        ...state,
        loginData:payload
      }
       default:
        return state;
   }
}

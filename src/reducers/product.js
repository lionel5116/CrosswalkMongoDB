import { PRODUCT_DATA } from '../actions/types';

const initialState = [];

export default function Login(state = initialState,action) {
  const {type,payload} = action;
  switch(type) {
     case PRODUCT_DATA:
      return {
        ...state,
        products:payload
      }
       default:
        return state;
   }
}

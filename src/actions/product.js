import { PRODUCT_DATA } from "./types";
import { setAlert } from './alert';
import  {
    LOGIN_FAIL,
 } from './types';

 
export const setProductData = (products) => async dispatch => {
    try {
        dispatch({
          type: PRODUCT_DATA,
          payload:products
        });
 
    } catch (err) {
        dispatch(setAlert(err.msg,'danger'))
        dispatch({
            type: LOGIN_FAIL
          })
    }
 };
 
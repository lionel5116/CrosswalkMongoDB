import {combineReducers} from 'redux'
import login from './login';
import alert from './alert';
import product from './product';

const allReducers = combineReducers({
    login,
    alert,
    product
})
 
export default allReducers;
import {createStore,applyMiddleware} from  'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import allReducers from '../reducers/index';
import thunk from 'redux-thunk';

//import { configureStore } from '@reduxjs/toolkit'

const initialState = {};

const middleware = [thunk];


export const store  = createStore(
    allReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);



/* THIS ACTUALLY WORKS (THE NEW WAY), BUT I THINK BECAUSE WE DONT HAVE OUR APPLYMIDDLE WARE, MY ALERT ACTIONS IS NOT WORKING
export const store = configureStore({
    reducer: {allReducers},
    allReducers
  })
*/



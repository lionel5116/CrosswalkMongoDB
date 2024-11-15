import axios from 'axios';
import { setAlert } from './alert';
import  {
   //REGISTER_SUCCESS,
   //REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT
} from './types';

//import setAuthToken from '../components/utils/setAuthToken';


//Load User
export const loadUser = () => async dispatch => {
    
   /* 
   if (localStorage.getItem('token') !== null) {
       var myToken = JSON.parse(window.localStorage.getItem('token'));
       console.log(`Token exists`);
       setAuthToken(myToken.token)
   } else {
       console.log(`Token does not exist`);
   }

   let serviceUrl = "";
   serviceUrl = process.env.REACT_APP_SERVICE_URL + '/auth'
   */

   try {
    //const res = await axios.get(serviceUrl);
    setAlert('User registered','primary');
    dispatch( {
        type: USER_LOADED,
        //payload: res.data
        payload: '123456-user-registered'
    });
   } catch (error) {
       dispatch({
           type: AUTH_ERROR
       })
   }
}

/*
//Register User
export const register = (name,email,password) => async dispatch => {
   const config = {
       headers: {
           'Content-Type':'application/json'
       }}

   const body = JSON.stringify({name,email,password});
   console.log(body);
   
   //var myToken = JSON.parse(window.localStorage.getItem('token'));
   //console.log(myToken.token)


   let serviceUrl = "";
   //http://localhost:5500/api/users
   serviceUrl = process.env.REACT_APP_SERVICE_URL + '/users'


   try {
       const res = await axios.post(serviceUrl,body,config);
       localStorage.setItem('token',JSON.stringify(res.data))

       dispatch({
         type: REGISTER_SUCCESS,
         payload:res.data
       });

     
      // console.log(localStorage.getItem('token'))


       dispatch(loadUser());

   } catch (err) {
       const errors = err.response.data.errors;
       if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg,'danger')));  
       }
       dispatch({
           type: REGISTER_FAIL
         })
   }
};
*/


//Login User
//the dispatch used in the try/catches are defined with the dispatch in the funtion signature
export const login = (email,password) => async dispatch => {
   /*
    const config = {
       headers: {
           'Content-Type':'application/json'
       }}
           */

   const body = JSON.stringify({email,password});
   console.log(body);
  

   //let serviceUrl = "";
   //serviceUrl = process.env.REACT_APP_SERVICE_URL + '/auth'

   try {
       //const res = await axios.post(serviceUrl,body,config);
       //localStorage.setItem('token',JSON.stringify(res.data))

       dispatch({
         type: LOGIN_SUCCESS,
         //payload:res.data
         payload:'123456-login success'
       });

       dispatch(loadUser());

   } catch (err) {
       /*
       const errors = err.response.data.errors;
       if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg,'danger')));  
       }
       */
       dispatch(setAlert(err.msg,'danger'))
       dispatch({
           type: LOGIN_FAIL
         })
   }
};

//LOG OUT / CLEAR Profle
export const logout =() => dispatch => {
   dispatch({type: LOGOUT});
}



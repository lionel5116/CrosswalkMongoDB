import React, { useRef ,useEffect} from 'react'
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {setAlert} from '../../actions/alert'
import  {login} from '../../actions/auth'

import { setProductData } from '../../actions/product';
import { fethCartProductData } from '../../api/sharedAPI';

const Login = ({setAlert,login,setProductData}) => {
const email = useRef();
const password = useRef();

//useEffect Methods ***********
useEffect(() => {
  getProductsFromDB()
}, []);

//const [_productsArray, setProducts] = useState([]);

/*
const productsArray = [
  {
      id:"price_1O4pH1KWeLMKqrB6RqvSw2RC",
      title:"Coffee",
      price:4.99
  },
  {
      id:"price_1O4pKcKWeLMKqrB6t6EsNZr5",
      title:"Sunglasses",
      price:9.99
  },
  {
      id:"price_1O4pLuKWeLMKqrB6RQLBbdo4",
      title:"Camera",
      price:39.99
  },

]
  */

async function getProductsFromDB() {
  let _SEARCH_DATA = [];
  _SEARCH_DATA = await fethCartProductData()
  setProductData(_SEARCH_DATA.product) //set state for products
}

const onSubmit = async e => {
  e.preventDefault();
  console.log(password.current.value.length)
  if(password.current.value.length === 0){
    setAlert('Please enter a password','danger');
  }
  else{
      login(email.current.value,
           password.current.value);
      clearScreen()
      setAlert('Login Sucessfull','primary');
  }
}


const clearScreen = ()  =>{
  email.current.value = '';
  password.current.value = '';

}


  return (
    <div className="container">

      <br />
      <h1>
       
      </h1>
      <br />
      <Card className="d-flex justify-content-center" style={{ width: '300px', position:'absolute',left:'40%'}} >
        <Card.Body>
          <Card.Title>Enter your Login Credentials</Card.Title>
          <Form
           onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e)
          }}
          >
            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="input"
                placeholder="Enter email"
                ref={email} 
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={password} 
               />
            </Form.Group>

            <Button variant="primary" type="submit" style={myStyles.buttonCustomStyle}>
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>

    </div>
  );
}

const myStyles = {
  buttonPadLeft: {
      marginLeft: '2px'
  },
  smallerTextFields: {
      width: '300px',
  },
  buttonCustomStyle: {
    width:'100%'
  }

};
const mapStateToProps = state => ({

})


export default connect(mapStateToProps, {setAlert,login,setProductData })(Login)
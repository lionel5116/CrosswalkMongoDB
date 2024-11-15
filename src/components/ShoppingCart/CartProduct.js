import { Button } from "react-bootstrap";
import { CartContext } from "./CartContext";
import { useContext } from "react";
//import { getProductsData } from "./productsStore";

import { connect } from 'react-redux';

export const CartProduct = ({products, ...props}) =>{
  const cart = useContext(CartContext);
  
  const id = props.id;
  const quantity = props.quantity;

  const productData = getProductsDataFromRedux(props.id)

  function getProductsDataFromRedux(id)
    {
        let productData = products.find(product => product.p_id === id) 
        if (productData === undefined) {
           console.log("Product data does not exist for id " + id)
           return undefined
        }
        
        return productData;
    }
  
  return (
    <>
     <h3>{productData.title}</h3>
     <p>{quantity} total</p>
     <p>${(quantity * productData.price).toFixed(2)}</p>
     <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
     <hr></hr>
    </>
  )

}


const mapStateToProps = state => ({
  products:state.product.products
})

export default connect(mapStateToProps)(CartProduct);
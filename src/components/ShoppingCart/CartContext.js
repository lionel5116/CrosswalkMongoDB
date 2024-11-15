import { createContext, useState } from "react";
//import { productsArray, getProductsData } from "./productsStore";

import { connect } from 'react-redux';

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => { },
    addOneToCart: () => { },
    removeOneFromCart: () => { },
    deleteFromCart: () => { },
    getTotalCost: () => { },
});


export function CartProvider({ children,products }) {
    const [cartProducts, setCartProducts] = useState([]);
   

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity

        if (quantity === undefined) { return 0; }

        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 0) {  //product is not in cart
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else {  //product is in cart
            setCartProducts(
                cartProducts.map(
                    product =>
                        product.id === id ? { ...product, quantity: product.quantity + 1 } : product  //if else using tenary
                )
            )
        }
    }

    function deleteFromCart(id) {
        setCartProducts(
            cartProducts =>
                cartProducts.filter(currentProduct => {
                    return currentProduct.id !== id;
                })
        )
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deleteFromCart(id)
        }
        else {
            setCartProducts(
                cartProducts.map(
                    product =>
                        product.id === id ? { ...product, quantity: product.quantity - 1 } : product  //if else using tenary
                )
            )
        }
    }

    function getTotalCost() {
        let totalCost = 0;
        
        /*
        cartProducts.map((cartItem) => {
            const productData = getProductsData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity)
        });
         */

        
        cartProducts.map((cartItem) => {
            const productData = getProductsDataFromRedux(cartItem.id);
            totalCost += (productData.price * cartItem.quantity)
        });
        

        return totalCost;
    }

    function getProductsDataFromRedux(id)
    {
        //let productData = products.find(product => product.id === id)
        let productData = products.find(product => product.p_id === id)
        //console.log(productData)
        if (productData === undefined) {
           console.log("Product data does not exist for id " + id)
           return undefined
        }
        
        return productData;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )

}


const mapStateToProps = state => ({
    products:state.product.products
})


//export default CartProvider;
export default connect(mapStateToProps)(CartProvider);

//Context (cart,addToCart,removeCart)
//Provider  -> gives your React app access to all the things in your context
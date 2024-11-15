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

function getProductsData(id) {
   let productData = productsArray.find(product => product.id === id)
   
   if (productData === undefined) {
      console.log("Product data does not exist for id " + id)
      return undefined
   }
   
   return productData;
}

export {productsArray,getProductsData};
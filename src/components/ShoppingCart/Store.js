import {Row,Col} from 'react-bootstrap';
//import { productsArray } from './productsStore';
import ProductCard from './ProductCard';

import { connect } from 'react-redux';

export const Store = ({products}) =>{

    return (
        <div className="container">
            <br />

            <>
            <h1 align="center" className='p-3'>Welcome to the store!</h1>
            <Row xs={1} md={3} className='g-4'>
                {products.map((product,idx) => (
                    <Col align="center" key={idx}>
                     <ProductCard product={product}/>
                    </Col>
                ))}
            </Row>
            </>

            <br />
       </div>
    )
  
}
  
const mapStateToProps = state => ({
    products:state.product.products
})

export default connect(mapStateToProps)(Store);





  //export const DacSchools = ({ createSchoolRecord, fetchECCSchoolData,fetchECCSchoolDataMYSQL,fetchSchoolDataMongoDBAtlas,createSchoolRecordMongoDBAtlas,fetchECCSchoolDataV8 }) => {
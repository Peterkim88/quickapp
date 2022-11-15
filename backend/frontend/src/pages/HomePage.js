import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";

function HomePage() {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList

  const location = useLocation();
  // console.log(keyword)
  
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");
  
  useEffect(() => {
    if (keyword){
      dispatch(listProducts(keyword))
    } else {
      dispatch(listProducts())
    }
  }, [dispatch, keyword])

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? <Loader />
        :error ? <Message variant='danger'>{error}</Message>
          :
          <Row>
            {products.map((product) => {
              return (
                <Col key={`product-${product._id}`} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              )
            })}
          </Row>
      }
    </div>
  )
}

export default HomePage
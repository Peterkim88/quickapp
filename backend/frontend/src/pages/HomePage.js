import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";

function HomePage() {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products, page, pages} = productList

  const location = useLocation();
  const keyword = location.search;
  
  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? <Loader />
        :error ? <Message variant='danger'>{error}</Message>
          :
          <div>
            <Row>
              {products.map((product) => {
                return (
                  <Col key={`product-${product._id}`} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                )
              })}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
      }
    </div>
  )
}

export default HomePage
import React, {useEffect} from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, updateCartQty, removeFromCart } from '../actions/cartActions'

function CartPage() {
  const params = useParams();
  const productId = params.id;
  const location = useLocation();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split('=')[1]) : 0
  
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const user = useSelector(state => state.userLogin)
  const { userInfo } = user

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))
    }
    navigate('/cart')
  }, [dispatch, navigate, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    userInfo ?
      navigate('/shipping') :
        navigate('/login')
  }
    
  return (
    <Row>
      <Col md={9}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map(item => {
                return (
                  <ListGroup.Item key={item.productId}>
                    <Row>
                      <Col md={2}>
                        <Link style={{textDecoration: 'none'}} to={`/product/${item.productId}`} >
                          <Image src={item.image} alt={item.name} fluid='rounded' />
                        </Link>
                      </Col>
                      <Col md={6}>
                        <Link style={{textDecoration: 'none'}} to={`/product/${item.productId}`} >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={1}>
                        ${item.price}
                      </Col>
                      <Col md={2}>
                        <Form.Control
                          className="form-select"
                          as="select"
                          value={item.qty}
                          onChange={(e) => 
                            dispatch(updateCartQty(item.productId, Number(e.target.value)))
                          }
                        >
                          {
                            [...Array(item.countInStock).keys()].map((x) => (
                              <option key={x+1} value={x+1}>
                                {x+1}
                              </option>
                            ))
                          }
                        </Form.Control>
                      </Col>
                      <Col md={1}>
                        <Button 
                          type='button' 
                          variant='light'
                          onClick={() => removeFromCartHandler(item.productId)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          )
        }
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
              ${cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartPage;
import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../reducers/orderReducers'

function PlaceOrderPage() {

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2))
    cart.shippingPrice = Number((cart.itemsPrice > 100 ? 0 : 10).toFixed(2))
    cart.taxPrice = Number((cart.itemsPrice * 0.082).toFixed(2))
    cart.totalPrice = Number((cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2))

    if(!cart.paymentMethod){
        navigate('/payment')
    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, dispatch, navigate, order])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup varant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'   '}
                                {cart.shippingAddress.postalCode}
                                {'   '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {cart.cartItems.length === 0 ? 
                                <Message variant='info'>Your cart is empty</Message> :
                                (<ListGroup variant='flush'>
                                    {cart.cartItems.map((item, idx) => (
                                        <ListGroup.Item key={idx}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>)
                                    )}
                                </ListGroup>)
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>

                            <ListGroup.Item>
                                <h3>Order Summary</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderPage
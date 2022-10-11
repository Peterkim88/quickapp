import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart } from '../actions/cartActions'

function CartPage({match, location, history}) {
    const params = useParams();
    const productId = params.id;
    const qty = location.search
    console.log('qty:', qty)
    
  return (
    <div>Cart</div>
  )
}

export default CartPage
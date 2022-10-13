import axios from "axios";
import { CART_ADD_ITEM, CART_UPDATE_ITEM, CART_REMOVE_ITEM } from "../reducers/cartReducers";

export const addToCart = (id, currQty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            productId: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: currQty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const updateCartQty = (id, newQty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
        type: CART_UPDATE_ITEM,
        payload:{
            productId: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: newQty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            productId: id
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
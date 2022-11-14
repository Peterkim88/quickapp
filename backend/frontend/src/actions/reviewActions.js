import axios from 'axios'
import { 
    REVIEW_CREATE_REQUEST, 
    REVIEW_CREATE_SUCCESS,
    REVIEW_CREATE_FAIL
} from '../reducers/reviewReducers'


export const createReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REVIEW_CREATE_REQUEST
        })
  
        const {
            userLogin: {userInfo}
        } = getState()
  
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        const { data } = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
  
        dispatch({
            type: REVIEW_CREATE_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: REVIEW_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                    : error.message
        })
    }
  }
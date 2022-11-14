export const REVIEW_CREATE_REQUEST = 'REVIEW_CREATE_REQUEST'
export const REVIEW_CREATE_SUCCESS = 'REVIEW_CREATE_SUCCESS'
export const REVIEW_CREATE_FAIL = 'REVIEW_CREATE_FAIL'
export const REVIEW_CREATE_RESET = 'REVIEW_CREATE_RESET'

export const reviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case 'CREATE_REVIEW_REQUEST':
        return {loading: true}
      case 'CREATE_REVIEW_SUCCESS':
        return {loading: false, success: true}
      case 'CREATE_REVIEW_FAIL':
        return {loading: false, error: action.payload}
      case 'CREATE_REVIEW_RESET':
        return {}
      default:
        return state;
    }
  }
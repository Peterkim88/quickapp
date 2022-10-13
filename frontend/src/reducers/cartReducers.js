export const CART_ADD_ITEM = "CART_ADD_ITEM"
export const CART_UPDATE_ITEM = "CART_UPDATE_ITEM"
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM"

export const cartReducer = (state={cartItems:[]}, action) => {
    const item = action.payload
    switch (action.type) {
        case CART_ADD_ITEM:
            const existItem = Object.values(state.cartItems).find(x => 
                x.productId === item.productId ?
                    true :
                        false
            )

            if (existItem){
                Object.values(state.cartItems).map(x => {
                    if (x.productId === item.productId) {
                        if (x.countInStock < (item.qty + x.qty)){
                            x.qty = x.countInStock
                        } else {
                            x.qty += Number(item.qty)
                        }
                    }
                })
                return {
                    ...state,
                    cartItems:[...state.cartItems]
                }
            } else {
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            };
        case CART_UPDATE_ITEM:
            Object.values(state.cartItems).map(x => {
                if (x && x.productId === item.productId) {
                    x.qty = Number(item.qty)
                }
            })
            return {
                ...state,
                cartItems:[...state.cartItems]
            }
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems:state.cartItems.filter(x => x.productId !== item.productId)
            }
        default:
            return state;
    }
}
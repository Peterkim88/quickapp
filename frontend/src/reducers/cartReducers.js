export const CART_ADD_ITEM = "CART_ADD_ITEM"
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM"

export const cartReducer = (state={cartItems:[]}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem){
                // console.log(existItem)
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? x.cartQty += item.cartQty : x
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        default:
            return state;
    }
}
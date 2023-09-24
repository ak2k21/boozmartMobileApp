import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    // cart: [{productId:77,quantity:1}]
    cartCount: 0,
    cart: [],
    userInfo:{
        credentials: {
            username: "",
            password: ""
        },
        userId: -1,
        userGoogleData: {
            photo: "",
            name: "",
            email: ""
        },
        phone: null,
        defaultAddress: {}
    },
}
const commonSlice = createSlice({
    name: "common",
    initialState: initialState,
    reducers: {
        setCartCount: (state, action) => {
            // state.cart = {...state.cart, ...action.payload}
            state.cartCount=action.payload
        },
        incrementCartCount: (state, action) => {
            state.cartCount = state.cartCount + 1
        },
        decrementCartCount: (state, action) => {
            state.cartCount = state.cartCount - 1
        },
        decrementCartCountBy: (state, action) => {
            state.cartCount = state.cartCount - action.payload
        },
        setUserTokenCredentials: (state, action) => {
            state.userInfo.credentials = action.payload
        },
        setUserId: (state, action) => {
            state.userInfo.userId = action.payload
        },
        setUserGoogleData: (state, action) => {
            state.userInfo.userGoogleData = action.payload
        },
        addToCart: (state, action) => {
            if(state.cart.filter(item => item.product_id == action.payload.product_id).length > 0){
                state.cart = state.cart.map(item => {
                    if(item.product_id == action.payload.product_id){
                        return {...item, count: item.count+1}
                    } else {
                        return item
                    }
                })
            } else {
                state.cart.push({...action.payload, count: 1})
            }
        },
        removeFromCart: (state, action) => {
            if(state.cart.filter(item => item.product_id == action.payload.product_id).length > 1){
                state.cart = state.cart.map(item => {
                    if(item.product_id == action.payload.product_id){
                        return {...item, count: item.count-1}
                    } else {
                        return item
                    }
                })
            } else if(state.cart.filter(item => item.product_id == action.payload.product_id).length == 1){
                state.cart = state.cart.filter(item => item.product_id != action.payload.product_id)
            }
        },
        deleteFromCart: (state, action) => {
            if(state.cart.filter(item => item.product_id == action.payload.product_id).length > 0){
                state.cart = state.cart.filter(item => item.product_id != action.payload.product_id)
            }
        },
        emptyCart: (state, action) => {
            state.cart = []
        },
        setDefaultAddress: (state, action) => {
            state.userInfo.defaultAddress = action.payload
        },
        setPhone: (state, action) => {
            state.userInfo.phone = action.payload
        }
    }
})

export const commonActions = commonSlice.actions
export default commonSlice
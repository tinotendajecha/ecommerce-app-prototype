import { createSlice } from "@reduxjs/toolkit";


const getInitialState = () => {
    const cartFromLocalStorage = localStorage.getItem('myCart');
    return cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : {
        cartItems : [],
        total : 0,
        qauntity : 0,
        discount : 0,
        shippingfee : 0,
    }
};

const initialState = getInitialState();

let calculateCartTotal = (cartItems) => {
    return cartItems.reduce((total, product) => {
        return total + (product.qauntity * product.price)
    }, 0);
}

let calculateCartQauntity = (cartItems) => {
    return cartItems.reduce((qauntity, product) => {
        return qauntity + product.qauntity
    }, 0)
}


const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        // fn which adds selected products to the cart
        addToCart : (state, action) => {
            const {id, name, price, imageUrl}  = action.payload;
            const qauntity = 1;

            const itemIndex = state.cartItems.findIndex(item => item.id === id);
            // If product does not already exist in the cart
            if(itemIndex === -1) {
                // Add product to cart if it does not already exist
                state.cartItems.push({id, name , qauntity, price, imageUrl})
            }else{
                // If the product already exists in the cart increment its qauntity
                state.cartItems[itemIndex].qauntity += 1
            }
            state.total = calculateCartTotal(state.cartItems);
            state.qauntity = calculateCartQauntity(state.cartItems);
            localStorage.setItem('myCart', JSON.stringify(state));
            // localStorage.removeItem('myCart') 
        },
        removeFromCart : (state, action) => {
            //fn responsible for removing selected products from cart
            const productId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== productId);

            state.total = calculateCartTotal(state.cartItems);
            state.qauntity = calculateCartQauntity(state.cartItems);
            localStorage.setItem('myCart' , JSON.stringify(state))
        },
        incrementQauntity : (state, action) => {
            const id = action.payload
            const itemIndex = state.cartItems.findIndex(item => item.id === id);

            state.cartItems[itemIndex].qauntity += 1;
            state.total = calculateCartTotal(state.cartItems);
            state.qauntity = calculateCartQauntity(state.cartItems);
        },
        decrementQauntity : (state, action) => {
            const id = action.payload
            const itemIndex = state.cartItems.findIndex(item => item.id === id);

            state.cartItems[itemIndex].qauntity -= 1
            state.total = calculateCartTotal(state.cartItems);
            state.qauntity = calculateCartQauntity(state.cartItems);
        },
        
    }
});


export const { addToCart, removeFromCart, incrementQauntity, decrementQauntity } = cartSlice.actions;

export default cartSlice.reducer;
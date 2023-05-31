import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products :  []
}

const productsSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        //Set products for landing page to local storage
        setProducts : (state, action) => {
            state.products = action.payload
        }
    }
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
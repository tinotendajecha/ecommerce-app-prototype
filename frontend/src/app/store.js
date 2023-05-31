import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/slices/authSlice';
import productsReducer from '../features/slices/productsSlice';
import apiSlice from '../features/apiSlices/APISlice';
import cartReducer from '../features/slices/CartSlice';


const store = configureStore({
    reducer : {
        auth : authReducer,
        cart : cartReducer,
        products : productsReducer,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
});

export default store;
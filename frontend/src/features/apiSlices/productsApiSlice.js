import apiSlice from "./APISlice";
const PRODUCTS_URL = '/api'

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getAllProducts : builder.query({
            query : () => `${PRODUCTS_URL}/products`
        })
    })
})


export const { useGetAllProductsQuery } = productsApiSlice;








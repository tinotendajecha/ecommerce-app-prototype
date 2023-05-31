import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetAllProductsQuery } from '../features/apiSlices/productsApiSlice';
import { setProducts } from '../features/slices/productsSlice';
import { addToCart } from '../features/slices/CartSlice';
import { toast } from 'react-toastify';

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  useEffect(() => {
    if (allProducts) {
      dispatch(setProducts(allProducts));
      setDataLoaded(true);
    }
  }, [allProducts, dispatch]);

  useEffect(() => {
    if (dataLoaded && products.phones && products.laptops) {
      // Code which loops the products array and returns the product which matches the curret is from params()
      const foundProduct = [...products.phones, ...products.laptops].find(
        (product) => product._id === id
      );
      if (foundProduct) {
        // Sets the matched product in from the product array
        setProduct(foundProduct);
      }
      setLoading(false);
    }
  }, [id, products, dataLoaded]);

  if (isLoading || loading) {
    return <div>Product is loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const addToCartHandler = () => {
    const { name, price, imageUrl } = product;
    
    //Checking if product is already in cart
    dispatch(addToCart({id, name, price, imageUrl}))
    toast.success('Product added to cart')
    
  }

  return (
    <div className="md:flex gap-10 p-10 w-full">
      <div className=" p-5 ml-10">
        <img className=" shadow-lg transition duration-200 w-5/5" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="flex flex-column p-5">
        <h1 className="lg:text-6xl mb-5 md:text-3xl sm:text-2xl">{product.name}</h1>
        <p className="lg:text-3xl md:text-xl sm:text-base ">{product.description}</p>
        <span className="lg:text-2xl mb-5 md:text-xl sm:text-base">${product.price}</span> 
        <div>
          <button className="bg-navBg text-white p-3 rounded-lg hover:bg-hoverCl transition duration-200" onClick={addToCartHandler}>Add to cart</button>
        </div>
      </div>
      
    </div>
  );
};

export default SingleProductPage;

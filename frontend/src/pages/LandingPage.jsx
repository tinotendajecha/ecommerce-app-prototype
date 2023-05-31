import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProducts } from "../features/slices/productsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../features/apiSlices/productsApiSlice";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  useEffect(() => {
    if (allProducts) {
      dispatch(setProducts(allProducts));
    }
  }, [dispatch, allProducts]);

  const { products } = useSelector((state) => state.products);

  let phoneList = [];
  let laptopList = [];

  if (products.phones) {
    products.phones.forEach((phone) => phoneList.push(phone));
  }

  if (products.laptops) {
    products.laptops.forEach((laptop) => laptopList.push(laptop));
  }

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="spinner-grow spinner-5xl" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SearchBar />
      <h1 className="text-navBg text-center text-3xl lg:text-4xl relative mt-3">
        Our refurbished products
      </h1>

      <div className="flex flex-column gap-5 ">
        <div className="flex flex-column ">
          <h2 className="text-navBg text-2xl text-center lg:text-3xl ">Phones</h2>
          <div className="flex gap-4 flex-wrap">
            {phoneList.map((phone) => {
              return (
                <div key={phone._id} className="ml-5 lg:w-1/5 md:w-1/3  md:mx-auto  ">
                  <Link className="no-underline" to={`products/${phone._id}`}>
                    <ProductCard product={phone} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-column ">
          <h2 className="text-navBg text-2xl text-center lg:text-3xl ">Laptops</h2>
          <div className="flex gap-4 flex-wrap  p-1">
            {laptopList.map((laptop) => {
              return (
                <div key={laptop._id} className="ml-5 lg:w-1/5 md:w-1/3 md:mx-auto sm:w-full ">
                  <Link className="no-underline" to={`products/${laptop._id}`}>
                    <ProductCard product={laptop} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import {
  incrementQauntity,
  decrementQauntity,
  removeFromCart
} from "../features/slices/CartSlice";
import { useDispatch } from "react-redux";

const CartProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { id } = product;

  const incrementQauntityHandler = () => {
    dispatch(incrementQauntity(id));
  };
  const decrementQauntityHandler = () => {
    dispatch(decrementQauntity(id));
  };

  const handleDeleteProductFromCart = () => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className="flex gap-3">
      <div className="w-1/2 mr-3">
        <img className="ml-2" src={product.imageUrl} alt="" />
      </div>
      <div>
        <h1>{product.name}</h1>
        <p>${product.price}</p>

        <div className="flex gap-4 ">
        <button className="text-xl mb-2.5" onClick={decrementQauntityHandler}>
            <FaMinus />
          </button>
          <p className="text-2xl">{product.qauntity}</p>
          <button className="text-xl mb-2.5" onClick={incrementQauntityHandler}>
            <FaPlus />
          </button>
        </div>
        <button className="flex bg-navBg text-white rounded p-2" onClick={ handleDeleteProductFromCart }>
            Delete 
            <span className="mt-1.5 ml-2 "><FaTrash /></span>
          </button>
      </div>
    </div>
  );
};

export default CartProductCard;

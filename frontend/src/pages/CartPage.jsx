import React, { useEffect } from 'react';
import { FaShoppingCart, } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import CartProductCard from '../components/CartProductCard';
import PayButton from '../components/PayButton';
import { useNavigate } from 'react-router-dom';


const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const { qauntity } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="flex">
        <div className="flex items-center justify-center  p-2 ">
          <span className="text-3xl"><FaShoppingCart className=" mr-3" /></span>
          <h1 className="text-xl">Your Cart </h1>
        </div>
      </div>

      <div className="flex flex-column gap-4">
        {cartItems.map((cartItem) => {
          return <CartProductCard key={cartItem.id} product={cartItem} />
        })}
      </div>

      <hr className="border border-solid" />

      {
        userInfo ? ( <PayButton />) : (
        <button onClick={() => navigate('/login')}>
          Login to checkout!
        </button>
        )
      }

    </div>
  )

}

export default CartPage

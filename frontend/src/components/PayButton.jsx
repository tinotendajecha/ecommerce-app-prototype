import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaDollarSign } from 'react-icons/fa';



const PayButton = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const { total } = useSelector((state) => state.cart)
    const { cartItems:products } = useSelector((state) => state.cart)
    
    const handleCheckout = () => {
        console.log('checkout')
        axios.post('/api/stripe/create-checkout-session', {
            products,
            userId : userInfo._id
        } ).then((res) => {
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }
  return (
    <>
    <div className="flex justify-between">
      <button className="flex ml-2 mb-2 bg-navBg text-white hover:hoverCl p-2 rounded-lg" onClick={handleCheckout}>Check Out
       <span className="mt-1 ml-2"><FaDollarSign /></span>
      </button>

      <p className="mr-5 text-2xl">${total}</p>
        
    </div>
    </>
  )
}

export default PayButton; 

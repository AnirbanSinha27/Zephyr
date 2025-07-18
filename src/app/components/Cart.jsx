'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
import toast from 'react-hot-toast';
import { urlFor } from '../lib/client';
import UserDetailsModal from './UserDetailsModal';

const Cart = () => {
  const cartRef = useRef();
  const { setShowCart, cartItems, totalPrice, totalQuantities, toggleCartItemQuantity, onRemove } = useStateContext();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modified payment handler to accept user data
  const handleRazorpayPayment = async (userData) => {
    const res = await fetch('/api/razorpay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: totalPrice * 100 }) // Razorpay amount is in paisa
    });
  
    const data = await res.json();
  
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay key
      amount: data.amount,
      currency: data.currency,
      name: 'Zephyr Store',
      description: 'Test Transaction',
      order_id: data.id,
      handler: function (response) {
        // Save order details to localStorage
        localStorage.setItem('orderDetails', JSON.stringify({
          user: userData,
          cart: cartItems,
          total: totalPrice
        }));
        // Redirect to success page after successful payment
        window.location.href = '/success';
      },
      prefill: {
        name: userData?.name || 'Zephyr Stores',
        email: userData?.email || 'orders@zephyr.com',
        contact: userData?.mobile || '9999999999'
      },
      notes: {
        age: userData?.age || ''
      },
      theme: {
        color: '#00000'
      }
    };
  
    if (window.Razorpay) {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      toast.error('Razorpay is not loaded');
    }
  };

  // Modal handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleUserDetailsSubmit = (details) => {
    setIsModalOpen(false);
    handleRazorpayPayment(details);
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <>
        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>₹{item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="quantity-desc">
                      <span className="minus" onClick={() => toggleCartItemQuantity(item._id, "dec")}>
                        <AiOutlineMinus />
                      </span>
                      <span className="num">{item.quantity}</span>
                      <span className="plus" onClick={() => toggleCartItemQuantity(item._id, "inc")}><AiOutlinePlus /></span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div >
            <div className='total'>
              <h3>Subtotal</h3>
              <h3>₹{totalPrice}</h3>
            </div>
          </div>
        </div>
        </>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='btn-container'>
              <button
                className='btn' type='button' onClick={handleOpenModal}>
                Pay with Razorpay
              </button>
            </div>
          </div>
        )}
        <UserDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleUserDetailsSubmit}
        />
      </div>
    </div>
  )
};

export default Cart;

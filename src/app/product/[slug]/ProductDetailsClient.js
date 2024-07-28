'use client';

import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlineStar, AiFillStar, AiOutlinePlus } from 'react-icons/ai';
import { Product } from '../../components';
import { urlFor } from '../../lib/client';
import { useStateContext } from '../../context/StateContext';

const ProductDetailsClient = ({ product, products }) => {
  const { image, name, price, details } = product;
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1); // Use local state for quantity

  const { onAdd,setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  const incQty = () => setQty(prevQty => prevQty + 1);
  const decQty = () => setQty(prevQty => (prevQty > 1 ? prevQty - 1 : 1));

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            {image?.length > 0 && (
              <img src={urlFor(image[index]).url()} alt={name} className='product-detail-image' />
            )}
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item).url()}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>20</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className='price'>₹{price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-product-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsClient;

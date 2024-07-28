import React from 'react'
import { Product, HeroBanner, FooterBanner } from './components'
import { client } from './lib/client'


const Home = async () => {

  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const headerbannerQuery = '*[_type == "headerbanner"]';
  const headerbannerData = await client.fetch(headerbannerQuery);

  return (
    <div>
      <HeroBanner heroBanner={headerbannerData.length && headerbannerData[0]}/>
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers and Headphones of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} product={product}/>)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
  )
}

export default Home

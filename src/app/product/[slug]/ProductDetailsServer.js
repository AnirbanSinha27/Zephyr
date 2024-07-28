import React from 'react';
import { client, urlFor } from '../../lib/client';
import ProductDetailsClient from './ProductDetailsClient';

const ProductDetailsServer = async ({ params }) => {
  const { slug } = params;

  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return <ProductDetailsClient product={product} products={products} />;
};

export default ProductDetailsServer;

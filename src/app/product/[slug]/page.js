import ProductDetailsServer from './ProductDetailsServer';

const ProductPage = async ({ params }) => {
  return <ProductDetailsServer params={params} />;
};

export default ProductPage;

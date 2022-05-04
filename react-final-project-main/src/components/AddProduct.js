/* eslint-disable react/no-unescaped-entities */
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { addProduct } from 'store/productSlice';
import * as Toast from 'components/common/Toast';
import ProductForm from 'components/common/ProductForm';
import LoadingSpinner from 'components/common/LoadingSpinner';

const initialProduct = {
  price: 0,
  title: '',
  imageUrl: '',
};

function AddProduct() {
  const { isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = useCallback(
    (product) => {
      dispatch(addProduct(product))
        .unwrap()
        .then(() => {
          Toast.success(`${product.title} is added`);
          navigate('/home');
        })
        .catch(console.error);
    },
    [dispatch, navigate],
  );

  return (
    <div data-testid="add-product-page">
      <Helmet>
        <title>Adding product to Leo's store</title>
        <meta name="description" content="Adding product to Leo's store" />
      </Helmet>
      <ProductForm
        product={initialProduct}
        handleFormSubmit={handleFormSubmit}
      />
      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
}

export default AddProduct;

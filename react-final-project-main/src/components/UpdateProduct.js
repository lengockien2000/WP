import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getProduct, updateProduct } from 'store/productSlice';
import * as Toast from 'components/common/Toast';
import ProductForm from 'components/common/ProductForm';
import LoadingSpinner from 'components/common/LoadingSpinner';

function UpdateProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { byIds, isLoading } = useSelector((state) => state.product);
  const product = byIds?.[productId];

  useEffect(() => {
    if (!product) {
      dispatch(getProduct(productId))
        .unwrap()
        .catch(() => navigate('/home'));
    }
  }, [dispatch, navigate, product, productId]);

  const handleFormSubmit = useCallback(
    (updatedProduct) => {
      dispatch(updateProduct(updatedProduct))
        .unwrap()
        .then(() => {
          Toast.success('Update success');
          navigate('/home');
        })
        .catch(console.error);
    },
    [dispatch, navigate],
  );

  if (!product) return <LoadingSpinner isLoading />;

  return (
    <div data-testid="update-product-page">
      <Helmet>
        <title>{product.title} updating</title>
        <meta name="description" content={`${product.title} updating`} />
      </Helmet>
      <ProductForm product={product} handleFormSubmit={handleFormSubmit} />
      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
}

export default UpdateProduct;

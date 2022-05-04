import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Device } from 'constants/mediaQuery';
import { formatVnd } from 'utils/formatter';
import { deleteProduct } from 'store/productSlice';
import * as Toast from 'components/common/Toast';
import LoadingSpinner from 'components/common/LoadingSpinner';
import ConfirmModal from './ConfirmModal';

function Product({ product }) {
  const { title, imageUrl, price, id } = product;
  const [isConfirmingDeleteProduct, setIsConfirmingDeleteProduct] =
    useState(false);
  const { isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => Toast.success('Delete success'))
      .catch(console.error);
  };

  const toggleConfirmDeleteModal = () =>
    setIsConfirmingDeleteProduct((prev) => !prev);

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      <Wrapper>
        <ProductInformation>
          <Information flex={5}>{title}</Information>
          <Information flex={2}>{formatVnd(price)}</Information>
          <Information flex={1}>
            <ImagePreview>
              Preview
              <Image src={imageUrl} />
            </ImagePreview>
          </Information>
        </ProductInformation>
        <ProductActions>
          <NavigateButton to={`/product/${id}`}>
            <i className="fa-solid fa-pen-to-square" />
          </NavigateButton>
          <Button
            onClick={toggleConfirmDeleteModal}
            data-testid="delete-button"
          >
            <i className="fa-solid fa-trash-can" />
          </Button>
        </ProductActions>
      </Wrapper>
      {isConfirmingDeleteProduct && (
        <ConfirmModal
          onConfirm={handleDelete}
          message="Do you really want to delete this item?"
          content={title}
          onHide={toggleConfirmDeleteModal}
        />
      )}
    </>
  );
}

const Wrapper = styled.ul`
  width: 100%;
  border-bottom: 1px solid pink;
  height: 60px;
  margin: 0;
  padding: 0;
  gap: 20px;
  display: flex;

  &:last-child {
    border: none;
  }
`;

const ProductInformation = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const ProductActions = styled.div`
  flex: 1;
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Information = styled.span`
  flex: ${(prop) => prop.flex};
  border-right: 1px solid;
  border-left: 1px solid;
  padding: 0 20px;
  font-size: var(--font-size);
  word-wrap: break-word;

  &:first-child {
    border-left: none;
    overflow: hidden;
  }

  &:nth-child(2) {
    min-width: 80px;
  }

  &:last-child {
    min-width: 66px;
  }

  @media ${Device.TABLET} {
    padding: 0 10px;
    height: 40px;
  }

  @media ${Device.MOBILE} {
    padding: 0 1px;
    height: 48px;
  }
`;

const NavigateButton = styled(Link)`
  display: flex;
  height: fit-content;

  & i {
    height: fit-content;
    font-size: var(--button-size);
  }
`;

const Button = styled.div`
  display: flex;
  height: fit-content;
  cursor: pointer;

  & i {
    height: fit-content;
    font-size: var(--button-size);
  }
`;

const ImagePreview = styled.div`
  text-align: center;
  cursor: pointer;

  &:hover img {
    display: unset;
  }
`;

const Image = styled.img`
  display: none;
  position: fixed;
  z-index: 2;
  height: min(72vh, 36vw);
  background-color: white;
  border: 3px solid;
  border-radius: 12px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`;

export default Product;

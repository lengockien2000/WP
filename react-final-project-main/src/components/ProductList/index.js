import { memo } from 'react';
import styled from 'styled-components';
import Product from './Product';

const ProductList = memo(({ productList = [] }) => (
  <List>
    {productList.map((product) => (
      <Product key={product.id} product={product} />
    ))}
  </List>
));

const List = styled.ul`
  width: 100%;
  /* min-height: 60vh; */
  overflow: auto;
  border: 1px solid;
  border-radius: 12px;
  border-top-left-radius: 0;
  margin-bottom: 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

export default ProductList;

import { createRequest, GET, POST, PUT, DELETE } from 'utils/request';

export const getProductList = (params = { sortBy: 'CREATED_TIME' }) =>
  createRequest(GET('/products', { params }));

export const getProduct = (id) => createRequest(GET(`/product/${id}`));

export const addProduct = (addInfo) =>
  createRequest(POST('/product', { body: addInfo }));

export const updateProduct = (updateInfo) =>
  createRequest(PUT(`/product/${updateInfo.id}`, { body: updateInfo }));

export const deleteProduct = (id) => createRequest(DELETE(`/product/${id}`));

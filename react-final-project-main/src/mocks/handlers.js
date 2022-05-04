/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';
import { BASE_URL } from 'constants';
import * as authController from './controllers/authController';
import * as productController from './controllers/productController';

const baseUrl = BASE_URL || 'http://localhost:3000';

export const handlers = [
  // authentication APIs
  rest.post(`${baseUrl}/token/refresh`),
  rest.post(`${baseUrl}/login`, authController.logIn),
  rest.post(`${baseUrl}/register`, authController.register),

  // products APIs
  rest.get(`${baseUrl}/products`, productController.getProducts),
  rest.get(`${baseUrl}/product/:id`, productController.getProduct),
  rest.post(`${baseUrl}/product`, productController.addProduct),
  rest.put(`${baseUrl}/product/:id`, productController.updateProduct),
  rest.delete(`${baseUrl}/product/:id`, productController.deleteProduct),
];

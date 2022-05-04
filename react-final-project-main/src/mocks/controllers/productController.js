/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import * as mock from 'mocks/mockForTesting';
import { controllerWrapper } from 'mocks/utils/utilFunction';
import * as Product from 'mocks/models/productModel';
import { verifyToken } from 'mocks/models/authenModel';

const getRequestParams = (req) => {
  const sortBy = req.url.searchParams.getAll('sortBy')[0];
  const search = req.url.searchParams.getAll('search')[0] || null;
  return { sortBy, search };
};

const getTokenFromRequest = (req) =>
  req.headers._headers.authorization.split(' ')[1];

const getSortFormula = (sortBy) => {
  switch (sortBy) {
    case 'PRICE_DECREASE':
      return (a, b) => b.price - a.price;
    case 'PRICE_INCREASE':
      return (a, b) => a.price - b.price;
    default:
      // for most recently added item first
      return (a, b) => b.createdTimestamp - a.createdTimestamp;
  }
};

const hasSearch = (title, search) =>
  title.toLowerCase().includes(search.toLowerCase());

export const getProducts = controllerWrapper(async (req, res, ctx) => {
  if (process.env.NODE_ENV === 'test') {
    const { sortBy, search } = getRequestParams(req);
    if (search)
      return res(
        ctx.json({
          message: 'Get successfully',
          data: mock.searchedProductList,
        }),
      );
    if (sortBy === 'PRICE_DECREASE')
      return res(
        ctx.json({
          message: 'Get successfully',
          data: mock.priceDecreaseProductList,
        }),
      );
    return res(
      ctx.json({
        message: 'Get successfully',
        data: mock.productList,
      }),
    );
  }
  if (!(await verifyToken(getTokenFromRequest(req))))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const { sortBy, search } = getRequestParams(req);
  let productList = await Product.getAll();
  if (search)
    productList = productList.filter((product) =>
      hasSearch(product.title, search),
    );
  productList.sort(getSortFormula(sortBy));
  return res(ctx.json({ message: 'Get successfully', data: productList }));
});

export const getProduct = controllerWrapper(async (req, res, ctx) => {
  if (process.env.NODE_ENV === 'test') {
    return res(
      ctx.json({
        message: 'Get successfully',
        data: mock.product,
      }),
    );
  }
  if (!(await verifyToken(getTokenFromRequest(req))))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const product = await Product.get(req.params.id);
  if (!product)
    return res(
      ctx.status(404),
      ctx.json({
        message: 'Get failed, product not found',
      }),
    );
  return res(ctx.json({ message: 'Get successfully', data: product }));
});

export const addProduct = controllerWrapper(async (req, res, ctx) => {
  if (process.env.NODE_ENV === 'test') {
    return res(
      ctx.json({
        message: 'Add successfully',
        data: mock.product,
      }),
    );
  }
  if (!(await verifyToken(getTokenFromRequest(req))))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const product = await Product.add(req.body);
  if (!product)
    return res(
      ctx.status(409),
      ctx.json({
        message: 'Add failed, duplicated product name',
      }),
    );
  return res(ctx.json({ message: 'Create successfully', data: product }));
});

export const updateProduct = controllerWrapper(async (req, res, ctx) => {
  if (process.env.NODE_ENV === 'test') {
    return res(
      ctx.json({
        message: 'Update successfully',
        data: mock.product,
      }),
    );
  }
  if (!(await verifyToken(getTokenFromRequest(req))))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const response = await Product.update(req.body);
  if (!response.ok) {
    if (response.status === 404)
      return res(
        ctx.status(404),
        ctx.json({
          message: 'Update failed, id not found',
        }),
      );
    if (response.status === 409)
      return res(
        ctx.status(409),
        ctx.json({
          message: 'Update failed, duplicated product name',
        }),
      );
  }
  return res(
    ctx.json({ message: 'Update successfully', data: response.product }),
  );
});

export const deleteProduct = controllerWrapper(async (req, res, ctx) => {
  if (process.env.NODE_ENV === 'test') {
    return res(
      ctx.json({
        message: 'Delete successfully',
      }),
    );
  }
  if (!(await verifyToken(getTokenFromRequest(req))))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const result = await Product.erase(req.params.id);
  if (!result)
    return res(
      ctx.status(404),
      ctx.json({
        message: 'Delete failed, product not found',
      }),
    );
  return res(ctx.json({ message: 'Delete successfully' }));
});

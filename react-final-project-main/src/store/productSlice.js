import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import * as normalizerSchema from 'utils/schemas/normalizrSchemas';
import * as productApi from 'api/productAPIs';

export const getProductList = createAsyncThunk('product/getList', (params) =>
  productApi.getProductList(params),
);

export const getProduct = createAsyncThunk('product/get', (id) =>
  productApi.getProduct(id),
);

export const updateProduct = createAsyncThunk('product/update', (product) =>
  productApi.updateProduct(product),
);

export const deleteProduct = createAsyncThunk('product/delete', (id) =>
  productApi.deleteProduct(id),
);

export const addProduct = createAsyncThunk('product/add', (product) =>
  productApi.addProduct(product),
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    isLoading: false,
    byIds: {},
    ids: [],
    isFirstLoad: true,
  },
  reducers: {
    setIsLoading: (state, action) => {
      /* eslint-disable */
      state.isLoading = action.payload;
      /* eslint-enable */
    },
    resetProductState: (state) => {
      /* eslint-disable */
      state.isFirstLoad = true;
      state.byIds = {};
      state.ids = [];
      state.isLoading = false;
      /* eslint-enable */
    },
  },
  extraReducers: {
    [getProductList.fulfilled]: (state, action) => {
      /* eslint-disable */
      const normalizedData = normalize(
        action.payload.data,
        normalizerSchema.arrayOfProduct,
      );
      state.byIds = normalizedData.entities.product;
      state.ids = normalizedData.result;
      state.isFirstLoad = false;
      /* eslint-enable */
    },
    [getProduct.fulfilled]: (state, action) => {
      /* eslint-disable */
      const normalizedData = normalize(
        action.payload.data,
        normalizerSchema.product,
      );
      state.byIds = { ...state.byIds, ...normalizedData.entities.product };
      state.ids = [...state.ids, normalizedData.result];
      /* eslint-enable */
    },
    [updateProduct.fulfilled]: (state, action) => {
      /* eslint-disable */
      const product = action.payload.data;
      if (state.ids.includes(product.id)) {
        state.byIds[product.id] = {
          ...state.byIds[product.id],
          ...product,
        };
      }
      // move id of product to the start of array ids
      state.ids = state.ids.filter((id) => id !== product.id);
      state.ids = [product.id, ...state.ids];
      /* eslint-enable */
    },
    [deleteProduct.fulfilled]: (state, action) => {
      /* eslint-disable */
      state.ids = state.ids.filter((id) => id !== action.meta.arg);
      delete state.byIds[action.payload.id];
      /* eslint-enable */
    },
    [addProduct.fulfilled]: (state, action) => {
      /* eslint-disable */
      const product = action.payload.data;
      state.byIds = { ...state.byIds, [product.id]: product };
      state.ids = [product.id, ...state.ids];
      /* eslint-enable */
    },
  },
});

export default productSlice.reducer;
export const { resetProductState } = productSlice.actions;

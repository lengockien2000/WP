/* eslint-disable no-param-reassign */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-return-assign */
import { v4 as uuid } from 'uuid';
import { getProductStore } from 'mocks/database/indexedDB';

export const getAll = async () => {
  const store = await getProductStore();
  const query = store.getAll();

  let resolvePromise;
  const promise = new Promise((resolve) => (resolvePromise = resolve));

  query.onsuccess = async () => {
    const productList = query.result;
    if (!productList) return resolvePromise([]);
    return resolvePromise(productList);
  };
  return promise;
};

export const get = async (id) => {
  const store = await getProductStore();
  const query = store.get(id);

  let resolvePromise;
  const promise = new Promise((resolve) => (resolvePromise = resolve));

  query.onsuccess = async () => {
    const product = query.result;
    if (!product) return resolvePromise(null);
    return resolvePromise(product);
  };
  return promise;
};

export const add = async (product) => {
  product.id = uuid();
  product.createdTimestamp = Date.now();

  const store = await getProductStore();
  const titleIndex = store.index('title');

  let resolvePromise;
  const promise = new Promise((resolve) => (resolvePromise = resolve));

  const queryTitle = titleIndex.get(product.title);

  queryTitle.onsuccess = async () => {
    const duplicatedProduct = queryTitle.result;
    if (duplicatedProduct) return resolvePromise(false);

    const query = store.put(product);

    return (query.onsuccess = async () => {
      const { result } = query;
      if (!result) return resolvePromise(false);
      return resolvePromise(product);
    });
  };

  return promise;
};

export const update = async (product) => {
  const store = await getProductStore();
  const titleIndex = store.index('title');

  let resolvePromise;
  const promise = new Promise((resolve) => (resolvePromise = resolve));

  const queryTitle = titleIndex.get(product.title);

  queryTitle.onsuccess = async () => {
    const duplicatedProduct = queryTitle.result;
    if (duplicatedProduct && duplicatedProduct.id !== product.id)
      return resolvePromise({ ok: false, status: 409 });

    const query = store.get(product.id);
    return (query.onsuccess = async () => {
      const oldProduct = query.result;
      if (!oldProduct) return resolvePromise({ ok: false, status: 404 });

      query.result.createdTimestamp = Date.now();
      query.result.title = product.title;
      query.result.price = product.price;
      query.result.imageUrl = product.imageUrl;
      store.put(query.result);
      return resolvePromise({ ok: true, product: query.result });
    });
  };
  return promise;
};

export const erase = async (id) => {
  const store = await getProductStore();
  const query = store.delete(id);

  let resolvePromise;
  const promise = new Promise((resolve) => (resolvePromise = resolve));

  query.onsuccess = async () => {
    resolvePromise(true);
  };
  query.onerror = async () => {
    resolvePromise(false);
  };
  return promise;
};

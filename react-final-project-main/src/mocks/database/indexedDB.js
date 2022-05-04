import * as productListJSON from './productList.json';
import * as authListJSON from './authList.json';

const { indexedDB } = window;
const { productList } = productListJSON.default;
const { authList } = authListJSON.default;

const initiateProductsDB = () => {
  const request = indexedDB.open('ProductsDatabase', 1);

  request.onerror = (error) => {
    if (process.env.NODE_ENV === 'development')
      console.log('error happened in product indexedDB:::', error);
  };

  request.onupgradeneeded = () => {
    const db = request.result;
    const store = db.createObjectStore('productList', { keyPath: 'id' });
    store.createIndex('price', 'price');
    store.createIndex('title', 'title');
  };

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction('productList', 'readwrite');

    const store = transaction.objectStore('productList');

    // un comment this to enable restore database after each refresh
    // store.delete(IDBKeyRange.lowerBound(1));

    const firstQuery = store.getAll();
    firstQuery.onsuccess = () => {
      const initialProductList = firstQuery.result;

      if (initialProductList.length === 0) {
        productList.map((product) => store.put(product));
      }
    };

    transaction.oncomplete = () => {
      db.close();
    };
  };
};

const initiateAuthenDB = () => {
  const request = indexedDB.open('AuthenDatabase', 1);

  request.onerror = (error) => {
    if (process.env.NODE_ENV === 'development')
      console.log('error happened in authen indexedDB:::', error);
  };

  request.onupgradeneeded = () => {
    const db = request.result;
    const store = db.createObjectStore('authen', { keyPath: 'id' });
    store.createIndex('email', ['email'], { unique: true });
    store.createIndex('email_password', ['email', 'password'], {
      unique: true,
    });
  };

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction('authen', 'readwrite');

    const store = transaction.objectStore('authen');

    // un comment this to enable restore database after each refresh
    // store.delete(IDBKeyRange.lowerBound(1));

    const firstQuery = store.getAll();
    firstQuery.onsuccess = () => {
      const initialProductList = firstQuery.result;

      if (initialProductList.length === 0) {
        authList.map((user) => store.put(user));
      }
    };

    transaction.oncomplete = () => {
      db.close();
    };
  };
};

const initiateDB = () => {
  initiateAuthenDB();
  initiateProductsDB();
};

const getAuthenStore = async () => {
  const request = indexedDB.open('AuthenDatabase', 1);
  let resolvePromise;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction('authen', 'readwrite');
    const store = transaction.objectStore('authen');
    resolvePromise(store);
  };
  return promise;
};

const getProductStore = async () => {
  const request = indexedDB.open('ProductsDatabase', 1);
  let resolvePromise;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction('productList', 'readwrite');
    const store = transaction.objectStore('productList');
    resolvePromise(store);
  };
  return promise;
};

export { getAuthenStore, getProductStore };
export default initiateDB;

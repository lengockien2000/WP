/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';
import initiateDB from './mocks/database/indexedDB';
import server from './mocks/server';

// mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return key === 'token'
        ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMDM5NjAwNi1mODEyLTQ3MTAtOGI5OS0yNDc5YTk5ODgxNDIifQ.MKCD0leU3KoMJB8R7I_3TlSS0bZjZKBAbWHNIKDv7As'
        : store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// mock indexedDB
initiateDB();

/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

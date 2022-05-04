/* eslint-disable no-undef */
import { waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import server from 'mocks/server';
import * as mock from 'mocks/mockForTesting';
import {
  renderAppWithRoute,
  screen,
  resetReduxProductState,
  resetReduxAuthState,
} from 'utils/test';

afterEach(() => {
  resetReduxProductState();
});

describe('Test for successful routing in App.js with valid session', () => {
  it('Should show home page', async () => {
    // render component
    renderAppWithRoute('/home');

    // wait for loading spinner to be removed
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // expect to have right page
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('Should redirect to home page when get into "/"', async () => {
    // render component
    renderAppWithRoute('/');

    // wait for loading spinner to be removed
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // expect to have right page
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('Should show add product page', async () => {
    // render component
    renderAppWithRoute('/product/create');

    // wait for loading spinner to be removed
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // expect to have right page
    expect(screen.getByTestId('add-product-page')).toBeInTheDocument();
  });

  it('Should show update product page', async () => {
    // render component
    renderAppWithRoute(`/product/${mock.product.id}`);

    // wait for loading spinner to be removed
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // expect to have right page
    expect(screen.getByTestId('update-product-page')).toBeInTheDocument();
  });

  it('Should redirect to "/home" when get to "/login" with valid session', async () => {
    // render component
    renderAppWithRoute(`/login`);

    // wait for loading spinner to be removed
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // expect to have right page
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('Should logout and show error when token is invalid', async () => {
    // mock msw to throw back an error
    server.use(
      rest.get('http://localhost:3000/products', async (req, res, ctx) =>
        res(
          ctx.status(401),
          ctx.json({
            message: 'Your session has expired, please login again',
          }),
        ),
      ),
    );

    // render component
    renderAppWithRoute('/home');

    // // wait for loading spinner to be removed
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // // expect error show and redirect to login page
    expect(
      screen.getAllByText('Your session has expired, please login again')[0],
    ).toBeInTheDocument();
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});

describe('Test for successful routing in App.js with expired session', () => {
  it('Should redirect to "/login" when dont have token', async () => {
    // logout
    resetReduxAuthState();

    // render component
    renderAppWithRoute(`/product/${mock.product.id}`);

    // expect to have right page
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('Should show login page', async () => {
    // logout
    resetReduxAuthState();

    // render component
    renderAppWithRoute(`/login`);

    // expect to have right page
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('Should show register page', async () => {
    // logout
    resetReduxAuthState();

    // render component
    renderAppWithRoute(`/register`);

    // wait for loading spinner to be removed
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // expect to have right page
    expect(screen.getByTestId('register-page')).toBeInTheDocument();
  });

  it('Should show not found page', async () => {
    // logout
    resetReduxAuthState();

    // render component
    renderAppWithRoute(`/notfoundpage`);

    // expect to have right page
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});

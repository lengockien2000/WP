/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import { waitForElementToBeRemoved } from '@testing-library/react';
import AddProduct from 'components/AddProduct';
import { render, act, screen } from 'utils/test';
import * as mock from 'mocks/mockForTesting';

describe('Test for adding successfully in AddProduct.js', () => {
  it('Should redirect to home and show add success toast', async () => {
    // render component
    render(<AddProduct />);

    // type product info
    userEvent.type(screen.getByLabelText(/title/i), mock.product.title);
    userEvent.type(screen.getByLabelText(/image url/i), mock.product.imageUrl);
    userEvent.type(screen.getByLabelText(/price/i), mock.product.price);

    // press save button
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /save/i })),
    );

    // wait for response
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // expect success toast and redirect to home page
    expect(
      screen.getByText(`${mock.product.title} is added`),
    ).toBeInTheDocument();
    expect(global.window.location.pathname).toBe('/home');
  });
});

describe('Test for error handling in AddProduct.js', () => {
  it('Should see null fields at first', async () => {
    // render component
    render(<AddProduct />);

    // expect null fields
    expect(screen.getByLabelText(/title/i).value).toBe('');
    expect(screen.getByLabelText(/image url/i).value).toBe('');
    expect(screen.getByLabelText(/price/i).value).toBe('0');
  });
});

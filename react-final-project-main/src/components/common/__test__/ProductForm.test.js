/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import ProductForm from 'components/common/ProductForm';
import { render, act, screen } from 'utils/test';

it('Should show product information', async () => {
  // mock valid data
  const mockProduct = {
    id: '4aff282b-46b0-469b-b91a-52f0b2fccabb',
    price: '5200000',
    title: 'GIÀY ULTRABOOST 22',
    imageUrl:
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/ULTRABOOST_22_DJen_GZ0127_01_standard.jpg',
    createdTimestamp: 1647869066420,
  };

  // render component
  render(<ProductForm product={mockProduct} />);

  // expect information to be shown
  expect(screen.getByRole('textbox', { name: /title/i }).value).toBe(
    mockProduct.title,
  );
  expect(screen.getByRole('textbox', { name: /image url/i }).value).toBe(
    mockProduct.imageUrl,
  );
  expect(screen.getByRole('textbox', { name: /price/i }).value).toBe(
    mockProduct.price,
  );
});

it('Should show error when fields are invalid', async () => {
  // mock invalid data
  const mockProduct = {
    id: '4aff282b-46b0-469b-b91a-52f0b2fccabb',
    price: 'none',
    title: 'none',
    imageUrl: 'none',
    createdTimestamp: 1647869066420,
  };

  // render component
  render(<ProductForm />);

  // type product information
  userEvent.type(screen.getByLabelText(/title/i), mockProduct.title);
  userEvent.type(screen.getByLabelText(/image url/i), mockProduct.imageUrl);
  userEvent.type(screen.getByLabelText(/price/i), mockProduct.price);

  // press save button
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /save/i })),
  );

  // expect error to be shown
  expect(screen.getAllByRole('alert')[0].textContent).toBe(
    'Title must be at least 5 characters',
  );
  expect(screen.getAllByRole('alert')[1].textContent).toBe(
    'Image url is invalid',
  );
  expect(screen.getAllByRole('alert')[2].textContent).toBe(
    'Price is needed to be a number',
  );
});

it('Should redirect to home when click return button', async () => {
  // render component
  render(<ProductForm />);

  // press return button
  userEvent.click(screen.getByTestId('return-button'));

  // expect to be redirected to home
  expect(global.window.location.pathname).toBe('/home');
});

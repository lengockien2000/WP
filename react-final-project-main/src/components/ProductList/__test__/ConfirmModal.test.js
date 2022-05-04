/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import ConfirmModal from 'components/ProductList/ConfirmModal';
import { render, screen, act } from 'utils/test';

beforeEach(() => {
  const div = document.createElement('div');
  div.setAttribute('id', 'portal');
  document.body.appendChild(div);
});

afterEach(() => {
  document.body.innerHTML = '';
});

it('Should show message ', async () => {
  // mock message
  const message = 'Are you sure?';

  // render component
  render(<ConfirmModal message={message} />);

  // expect information to be shown
  expect(screen.getByText(/Are you sure?/i)).toBeInTheDocument();
});

it('Should call onConfirm,turnOff function when yes is pressed ', async () => {
  // mock onConfirm, turnOff functions
  const onConfirm = jest.fn();
  const onHide = jest.fn();

  // render component
  render(<ConfirmModal onConfirm={onConfirm} onHide={onHide} />);

  // press confirm button
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /yes/i })),
  );

  // expect onConfirm, turnOff functions to be called
  expect(onConfirm).toHaveBeenCalledTimes(1);
  expect(onHide).toHaveBeenCalledTimes(1);
});

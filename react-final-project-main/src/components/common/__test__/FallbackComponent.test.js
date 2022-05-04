/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import FallbackComponent from 'components/common/FallbackComponent';
import { render, screen } from 'utils/test';

it('Should show error message and redirect when click try again', async () => {
  // mock resetErrorBoundary
  const resetErrorBoundary = jest.fn();

  // mock props
  const props = {
    error: {
      message: 'testing message',
    },
    resetErrorBoundary,
  };

  // render component
  render(<FallbackComponent {...props} />);

  // expect error message to be shown
  expect(screen.getByText(/testing message/i)).toBeInTheDocument();

  // press try again button
  userEvent.click(screen.getByRole('button', { name: /try again/i }));

  // expect resetErrorBoundary to be called when try again button clicked
  expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
});

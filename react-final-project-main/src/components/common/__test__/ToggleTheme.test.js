/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import Header from 'components/common/Header';
import { render, screen } from 'utils/test';

it('Should be light theme at the beginning and change theme to dark when button is clicked', async () => {
  // render component
  render(<Header />);

  // expect icon of light theme
  expect(screen.getByTestId('light-theme-icon')).toBeInTheDocument();

  // click on toggle theme button
  userEvent.click(screen.getByTestId('toggle-theme-button'));

  // expect icon of dark theme
  expect(screen.getByTestId('dark-theme-icon')).toBeInTheDocument();
});

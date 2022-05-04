/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import { waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import Login from 'components/Login';
import { render, act, screen } from 'utils/test';
import server from 'mocks/server';

describe('Test for logging in successfully in Login.js', () => {
  it('Should redirect and show toast when login with valid information', async () => {
    // make valid data
    const loginInfo = {
      email: 'phuong@gmail.com',
      password: 'phuong123',
    };

    // render component
    render(<Login />);

    // type login info
    userEvent.type(screen.getByLabelText(/email/i), loginInfo.email);
    userEvent.type(screen.getByLabelText(/password/i), loginInfo.password);

    // press login button
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /login/i })),
    );

    // wait for response
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // screen.debug();
    // // expect success toast and redirect to home page
    expect(global.window.location.pathname).toBe('/home');
    expect(screen.queryByText('Login success')).toBeInTheDocument();
  });
});

describe('Test for error handling in Login.js', () => {
  it('Should show error when fields are invalid', async () => {
    // make invalid data
    const loginInfo = {
      email: '123',
      password: '123',
    };

    // render component
    render(<Login />);

    // press login button
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /login/i })),
    );

    // check error message
    expect(screen.getAllByRole('alert')[0].textContent).toBe(
      'Email is required',
    );
    expect(screen.getAllByRole('alert')[1].textContent).toBe(
      'Password is required',
    );

    // type login info
    userEvent.type(screen.getByLabelText(/email/i), loginInfo.email);
    userEvent.type(screen.getByLabelText(/password/i), loginInfo.password);

    // press login button
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /login/i })),
    );

    // check error message
    expect(screen.getAllByRole('alert')[0].textContent).toBe(
      'Email is invalid',
    );
    expect(screen.getAllByRole('alert')[1].textContent).toBe(
      'Password must be at least 5 characters',
    );
  });

  it('Should show error toast when login with invalid information', async () => {
    // mock handler to throw error
    server.use(
      rest.post('http://localhost:3000/login', async (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            message: 'Login failed, wrong username or password',
          }),
        ),
      ),
    );

    // make invalid data
    const loginInfo = {
      email: 'phuong@gmail.com',
      password: 'wrongpassword',
    };

    // render component
    render(<Login />);

    // type login info
    userEvent.type(screen.getByLabelText(/email/i), loginInfo.email);
    userEvent.type(screen.getByLabelText(/password/i), loginInfo.password);

    // press login button
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /login/i })),
    );

    // wait for response
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // expect error toast
    expect(
      screen.queryByText('Login failed, wrong username or password'),
    ).toBeInTheDocument();
  });
});

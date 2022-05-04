/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import { waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import Register from 'components/Register';
import { render, waitFor, act, screen } from 'utils/test';
import server from 'mocks/server';

describe('Test for successful registering in Register.js', () => {
  it('Should redirect and show toast when register with valid information', async () => {
    // make valid data
    const registerInfo = {
      email: 'testingAccount@gmail.com',
      userName: 'testing user',
      password: 'phuong123',
      confirmPassword: 'phuong123',
    };

    // render component
    render(<Register />);

    // type register info
    userEvent.type(screen.getByLabelText(/email/i), registerInfo.email);
    userEvent.type(screen.getByLabelText(/user name/i), registerInfo.userName);
    userEvent.type(
      screen.getAllByLabelText(/password/i)[0],
      registerInfo.password,
    );
    userEvent.type(
      screen.getAllByLabelText(/password/i)[1],
      registerInfo.confirmPassword,
    );

    // press register button
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /register/i })),
    );

    // wait for response
    await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i));

    // expect success toast and redirect to home page
    expect(global.window.location.pathname).toBe('/home');
    expect(screen.getByText('Register success')).toBeInTheDocument();
  });
});

describe('Test for error handling in Register.js', () => {
  it('Should show error when fields are invalid', async () => {
    // make invalid data
    const registerInfo = {
      email: 'invalidEmail',
      userName: 'none',
      password: 'none',
      confirmPassword: 'none',
    };

    // render component
    render(<Register />);

    // press register button
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /register/i })),
    );

    // check error message
    expect(screen.getAllByRole('alert')[0].textContent).toBe(
      'Email is required',
    );
    expect(screen.getAllByRole('alert')[1].textContent).toBe(
      "User's name is required",
    );
    expect(screen.getAllByRole('alert')[2].textContent).toBe(
      'Password is required',
    );
    expect(screen.getAllByRole('alert')[3].textContent).toBe(
      'Confirm password is required',
    );

    // type register info
    userEvent.type(screen.getByLabelText(/email/i), registerInfo.email);
    userEvent.type(screen.getByLabelText(/user name/i), registerInfo.userName);
    userEvent.type(
      screen.getAllByLabelText(/password/i)[0],
      registerInfo.password,
    );
    userEvent.type(
      screen.getAllByLabelText(/password/i)[1],
      registerInfo.confirmPassword,
    );

    // press register button
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /register/i })),
    );

    // check error message
    expect(screen.getAllByRole('alert')[0].textContent).toBe(
      'Email is invalid',
    );
    expect(screen.getAllByRole('alert')[1].textContent).toBe(
      "User's name must be at least 5 characters",
    );
    expect(screen.getAllByRole('alert')[2].textContent).toBe(
      'Password must be at least 5 characters',
    );
    expect(screen.getAllByRole('alert')[3].textContent).toBe(
      'Password must be at least 5 characters',
    );
  });

  it('Should show error toast when register with invalid information', async () => {
    // mock msw handler to throw back error
    server.use(
      rest.post('http://localhost:3000/register', async (req, res, ctx) =>
        res(
          ctx.status(409),
          ctx.json({
            message: 'Register failed, email has already been used',
          }),
        ),
      ),
    );

    // make invalid data
    const registerInfo = {
      email: 'phuong@gmail.com',
      userName: 'testing user',
      password: 'phuong123',
      confirmPassword: 'phuong123',
    };

    // render component
    render(<Register />);

    // type register info
    userEvent.type(screen.getByLabelText(/email/i), registerInfo.email);
    userEvent.type(screen.getByLabelText(/user name/i), registerInfo.userName);
    userEvent.type(
      screen.getAllByLabelText(/password/i)[0],
      registerInfo.password,
    );
    userEvent.type(
      screen.getAllByLabelText(/password/i)[1],
      registerInfo.confirmPassword,
    );

    // press register button
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /register/i })),
    );

    // wait for response
    await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i));

    // expect success toast and redirect to home page
    await waitFor(() =>
      expect(
        screen.getByText('Register failed, email has already been used'),
      ).toBeInTheDocument(),
    );
  });
});

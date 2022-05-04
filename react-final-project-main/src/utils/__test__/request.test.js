/* eslint-disable no-undef */
import { createRequest } from 'utils/request';
import { token } from 'utils/test';

beforeAll(() => {
  window.fetch = jest.fn();
});

it('Should see null fields at first', async () => {
  // window.fetch mock
  window.fetch.mockImplementation(async () => ({
    ok: true,
    json: async () => 'payload',
  }));

  // mock request inputs
  const data = {
    endpoint: '/testEndpoint',
    body: 'body',
    token: 'token',
    params: 'search=test',
  };

  // generate expected url and config
  const expectedConfig = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: '"body"',
  };

  const expectedUrl = `http://localhost:3000/testEndpoint?search=test`;

  // make request
  const payload = await createRequest(data);

  // expect fetch to be called with correct config
  expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  expect(payload).toBe('payload');
});

it('Should throw error when status is error code', async () => {
  // window.fetch mock
  window.fetch.mockImplementation(async () => ({
    ok: false,
    status: 404,
    json: async () => ({
      message: 'not found',
    }),
  }));

  // mock request inputs
  const data = {
    endpoint: '/testEndpoint',
  };

  // make request
  try {
    await createRequest(data);
  } catch (error) {
    // expect error to be thrown
    expect(error.code).toBe('404');
    expect(error.message).toBe('not found');
  }
});

/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { BASE_URL } from 'constants';

const generateUrlWithParams = (givenUrl, params) => {
  if (!params.search) params.search = '';
  const url = new URL(givenUrl);
  url.search = new URLSearchParams(params);
  return url.toString();
};

const getToken = () => localStorage.getItem('token');

export const createRequest = async ({
  endpoint,
  method = 'GET',
  body = null,
  params = null,
}) => {
  const url = `${BASE_URL || 'http://localhost:3000'}${endpoint}`;
  const requestUrl = params ? generateUrlWithParams(url, params) : url;
  const token = getToken();
  const requestConfig = {
    method,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(requestUrl, requestConfig);
  const payload = await response.json();
  if (!response.ok) {
    const error = new Error(payload.message);
    error.code = response.status.toString();
    throw error;
  }
  return payload;
};

export const GET = (endpoint, options) => ({
  endpoint,
  ...options,
  method: 'GET',
});

export const POST = (endpoint, options) => ({
  endpoint,
  ...options,
  method: 'POST',
});

export const PUT = (endpoint, options) => ({
  endpoint,
  ...options,
  method: 'PUT',
});

export const DELETE = (endpoint, options) => ({
  endpoint,
  ...options,
  method: 'DELETE',
});

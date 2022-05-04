import { createRequest, POST } from 'utils/request';

export const login = (loginInfo) =>
  createRequest(POST('/login', { body: loginInfo }));

export const register = (registerInfo) =>
  createRequest(POST('/register', { body: registerInfo }));

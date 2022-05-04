import * as Authen from 'mocks/models/authenModel';
import { controllerWrapper } from 'mocks/utils/utilFunction';

export const logIn = controllerWrapper(async (req, res, ctx) => {
  if (process.env.NODE_ENV === 'test') {
    return res(
      ctx.json({
        message: 'Login success',
        data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMDM5NjAwNi1mODEyLTQ3MTAtOGI5OS0yNDc5YTk5ODgxNDIifQ.MKCD0leU3KoMJB8R7I_3TlSS0bZjZKBAbWHNIKDv7As',
      }),
    );
  }
  const logInInfo = req.body;
  const token = await Authen.logIn(logInInfo);
  if (!token)
    return res(
      ctx.status(400),
      ctx.json({
        message: 'Login failed, wrong username or password',
      }),
    );
  return res(ctx.json({ message: 'Login success', data: token }));
});

export const register = controllerWrapper(async (req, res, ctx) => {
  const registerInfo = req.body;
  try {
    const token = await Authen.register(registerInfo);
    return res(ctx.json({ message: 'Register success', data: token }));
  } catch (error) {
    return res(
      ctx.status(409),
      ctx.json({
        message: 'Register failed, email has already been used',
      }),
    );
  }
});

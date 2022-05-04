/* eslint-disable import/prefer-default-export */
export const controllerWrapper = (fn) => async (req, res, ctx) => {
  try {
    return await fn(req, res, ctx);
  } catch (error) {
    if (process.env.NODE_ENV === 'development')
      console.log('in server controller:::', error);
    return res(
      ctx.status(500),
      ctx.json({
        message: 'Server internal error ...',
      }),
    );
  }
};

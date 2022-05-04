const httpStatusHandlerMiddleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV === 'development') console.log(action);
  const status = action.meta?.requestStatus || null;
  if (!status) return next(action);
  const stateName = action.type.split('/')[0];
  store.dispatch({
    type: `${stateName}/setIsLoading`,
    payload: status === 'pending',
  });
  return next(action);
};

export default httpStatusHandlerMiddleware;

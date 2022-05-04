/* eslint-disable no-fallthrough */
import * as Toast from 'components/common/Toast';

const httpErrorHandlerMiddleware = (store) => (next) => (action) => {
  if (!action.error) return next(action);
  const { message, code } = action.error;
  switch (code) {
    case '401':
      store.dispatch({
        type: 'auth/logout',
      });
    case '400':
    case '404':
    case '409':
    case '500':
      return Toast.error(message);
    default:
      if (process.env.NODE_ENV === 'development')
        console.log('Un-catched status code:::', action);
      return Toast.error('Unknown error');
  }
};

export default httpErrorHandlerMiddleware;

import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from '@ahaui/react';
import { ThemeProvider } from 'context/ThemeContext';
import { store } from 'store';
import { resetProductState } from 'store/productSlice';
import { resetAuthState } from 'store/authSlice';
import App from 'App';

const render = (ui, { ...options } = {}) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <ToastContainer />
          <Router>{children}</Router>
        </ThemeProvider>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

const renderAppWithRoute = (route = '/', { ...options } = {}) => {
  function Wrapper({ children }) {
    window.history.pushState({}, 'Test page', route);
    return (
      <Provider store={store}>
        <ThemeProvider>
          <ToastContainer />
          <Router>{children}</Router>
        </ThemeProvider>
      </Provider>
    );
  }

  return rtlRender(<App />, { wrapper: Wrapper, ...options });
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMDM5NjAwNi1mODEyLTQ3MTAtOGI5OS0yNDc5YTk5ODgxNDIifQ.MKCD0leU3KoMJB8R7I_3TlSS0bZjZKBAbWHNIKDv7As';

const resetReduxProductState = () => store.dispatch(resetProductState());

const resetReduxAuthState = () => store.dispatch(resetAuthState());

export * from '@testing-library/react';
export {
  render,
  renderAppWithRoute,
  token,
  resetReduxProductState,
  resetReduxAuthState,
};

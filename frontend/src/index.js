import React from 'react';
// import everything from the /store/session and set a key on the
// window obj below to be window.sessionActions = sessionActions.
import * as sessionActions from './store/session'
import * as spotsActions from './store/spots'
import * as bookingsActions from './store/bookings'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ModalProvider } from './context/Modal'
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import './index.css';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.spotsActions = spotsActions;
  window.bookingsActions = bookingsActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);

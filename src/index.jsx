import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store';

const store = configureStore();

setTimeout(() => {
  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}, 1500);

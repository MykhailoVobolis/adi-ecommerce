import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import App from './components/App/App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import Modal from 'react-modal';

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Theme accentColor="gray" radius="none">
          <App />
        </Theme>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

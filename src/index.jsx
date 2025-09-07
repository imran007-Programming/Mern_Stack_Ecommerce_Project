import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/App/Store';
import CartProvider from './Contexapi/Cartopencontex';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
     <CartProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </CartProvider>
    </BrowserRouter>
  
);



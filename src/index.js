import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

// Crea un root y renderiza la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
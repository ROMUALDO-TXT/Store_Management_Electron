import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DatabaseProvider } from './context/DatabaseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DatabaseProvider>
      <App />
    </DatabaseProvider>
  </React.StrictMode>
);


reportWebVitals();

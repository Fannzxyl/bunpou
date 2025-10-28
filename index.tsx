import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import CSS Tailwind dari folder src agar ikut dibundel saat build produksi
import './src/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

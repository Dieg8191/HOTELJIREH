import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar el método correcto
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

// Cambiar render por createRoot
const root = ReactDOM.createRoot(document.getElementById('root')); // Crear la raíz
root.render(
  <Router> {/* Envuelve tu aplicación en Router */}
    <App />
  </Router>
);
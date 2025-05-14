// Import React core and routing utilities
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import main components
import App from './App';
import ProductView from './components/ProductView';

// Entry point: Mount React app to the DOM with client-side routing
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Enable React Router for SPA navigation */}
    <BrowserRouter>
      <Routes>
        {/* Route for main dashboard (product list + form) */}
        <Route path="/" element={<App />} />

        {/* Dynamic route for viewing/editing a specific product */}
        <Route path="/product/:id" element={<ProductView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

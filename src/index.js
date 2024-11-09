// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Make sure this file exists
import App from "./App"; // Ensure LoginApp.js is in the src directory
import reportWebVitals from "./reportWebVitals"; // Performance measuring tool

// Create a root element for rendering the app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the main application component
root.render(
  <React.StrictMode>
    <App /> {/* This will render your LoginApp component */}
  </React.StrictMode>
);

// Optional: measure performance in your app
reportWebVitals();

// src/LoginApp.js
import React from "react";
import "./Login.css"; // Ensure this file existsnpm
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./register/Register";

function LoginApp() {
  // This should match the export
  return (
    <React.Fragment>
      <Register />
    </React.Fragment>
  );
}

export default LoginApp; // Correctly exporting the component

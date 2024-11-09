import React from "react";
import "./register.css"; // Assuming register.css is in the same directory as Register.jsx
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="addUser">
      <h3>Register</h3>
      <form className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            autoComplete="off"
            placeholder="Enter your First Name"
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            autoComplete="off"
            placeholder="Enter your Last Name"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your Email:"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder="Enter your Passwrod"
          />

          <button type="submit" class="btn btn-success">
            Register
          </button>
        </div>
      </form>
      <div className="login">
        <p>Already have an account ?</p>
        <Link to="/login" type="submit" class="btn btn-primary">
          Login
        </Link>

        <Link to="/projects" type="submit" class="btn btn-primary">
          Projects
        </Link>
      </div>
    </div>
  );
};

export default Register; // Ensure you are exporting the correct component

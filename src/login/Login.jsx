import Form from "react-bootstrap/Form";
import "./login.css"; // Assuming register.css is in the same directory as Register.jsx
import { Link } from "react-router-dom";
import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <div className="test">
      <div className="verifyUser">
        <h3>Login</h3>
        <form className="verifyUserForm">
          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="formContainer">
            <Form>
              {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="rememberMeCheckBox">
                  <Form.Check
                    type={type}
                    id={`default-${type}`}
                    label={`Remember Me`}
                  />
                </div>
              ))}
            </Form>

            <div className="registerButton">
              <Link
                to="/register"
                type="submit"
                style={{ textDecoration: "underline" }}
              >
                Register
              </Link>
            </div>
          </div>

          <div className="loginSubmitButton">
            <button type="submit" class="btn btn-success">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login; // Ensure you are exporting the correct component

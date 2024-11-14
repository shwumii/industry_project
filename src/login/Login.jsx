import Form from "react-bootstrap/Form";
import "./login.css"; // Assuming register.css is in the same directory as Register.jsx
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

// Removed 2024/11/15 - Jesse
//function Login({ onLogin }) {
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");

//  function handleSubmit(event) {
//    event.preventDefault();
//    onLogin({ email, password });
//  }

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:5000/user/login", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            // Handle response validation
            if (!response.ok) {
                throw new Error("Login failed. Please try again.");
            }

            // Parse the response data
            const data = await response.json();

            if (data.success) {
                // Store the user ID in localStorage or sessionStorage
                localStorage.setItem("session", data.session);

                // Redirect the user to the home page or any other page you want
                navigate("/projects");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please try again.");
        }
    }

    return (
        <div className="test">
            <div className="verifyUser">
                <h3>Login</h3>
                <form className="verifyUserForm" onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn btn-success">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login; // Ensure you are exporting the correct component

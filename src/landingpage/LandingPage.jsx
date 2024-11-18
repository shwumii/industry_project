import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { User } from "../types";

// set up in login page, but make it so else if logged in redirect to projects page

function LandingPage() {
  const [user, setUser] = (useState < User) | (null > null);

  const logoutUser = async () => {
    await httpClient.post("http://localhost:5000/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("http://localhost:5000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <div>
      <h1>Welcome to this React Application</h1>
      {user != null ? (
        <div>
          <h3>Logged In</h3>
          <h3>ID: {user.id}</h3>
          <h3>Email: {user.email}</h3>

          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <div>
            <a href="/login">
              <button>Login</button>
            </a>
            <a href="/register">
              <button>Register</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;

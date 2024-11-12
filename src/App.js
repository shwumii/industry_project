import React from "react";
import "./App.css";
import Login from "./login/Login";
import Register from "./register/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { CookiesProvider, useCookies } from "react-cookie";
import ProjectsTable from "./projects/ProjectsTable";
import CustomSearchBox from "./projects/CustomSearchBox";
import AssetsTable from "./projects/AssetsTable";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }

  const router = createBrowserRouter([
    {
      path: "/", // Home route
      element: <Login />,
    },
    {
      path: "/login", // Login route
      element: <Login />,
    },
    {
      path: "/register", // Register route
      element: <Register />,
    },
    {
      path: "/projects", // Register route
      element: <CustomSearchBox />,
      element: <ProjectsTable />,
    },
  ]);

  return (
    <CookiesProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </CookiesProvider>
  );
}

export default App;

// Developer: Jesse Read
// Github: JesseReadAu
// Date: 15/11/2024
// Function: A logout script that removes a localStoage session and redirects the
//           user to the login page. It has been implimented in App.js so a user only
//           needs to visit or be directed to site.com/logout

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        
        const handleLogout = () => {
            // Remove session from localStorage.
            localStorage.removeItem("session");
            
            // Optional: Remove other localStorage if appicable.
            // localStorage.removeItem("OTHER_VALUE");

            // Debug message and redirect to Login.
            console.log("User logged out successfully.");
            navigate("/login");
        };

        handleLogout();
    }, [navigate]);

    return null; // Return nothing to render.
};

export default Logout;
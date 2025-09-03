import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';


const CheckAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admintoken');
       
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.exp) {
              const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
              if (decodedToken.exp < currentTime) {
                // Token expired, redirect to login page
                navigate('/login');
              }
            } else {
              // Invalid token or missing expiration time, redirect to login page
              navigate('/login');
            }
          } else {
            // No token found, redirect to login page
            navigate('/login');
          }
        }, [navigate]);

    return null; // This component doesn't render anything
};

export default CheckAuth;
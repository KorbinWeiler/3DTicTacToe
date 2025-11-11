import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Utils/UserContext';

const ProtectedRoute = ({ children }) => {
  const { Token } = useContext(UserContext);
  const [token, setToken] = Token;

  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected content
  return children;
};

export default ProtectedRoute;
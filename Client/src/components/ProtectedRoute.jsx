import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Utils/UserContext';

const ProtectedRoute = ({ children }) => {

  // If there's no token, redirect to login
  const currentToken = sessionStorage.getItem('token');
  if (!currentToken) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected content
  return children;
};

export default ProtectedRoute;
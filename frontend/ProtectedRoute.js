import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role');
  return allowedRoles.includes(role) ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ isLoggedIn, children }) => {
 if (!isLoggedIn) {
   return <Navigate to="/user/signin" />;
 }
 return children;
};
export default ProtectedRoute;

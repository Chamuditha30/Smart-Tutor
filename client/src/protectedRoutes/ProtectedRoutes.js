import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get("/users/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error verifying user:", error);
        setUser(null);
      }
    };

    verifyUser();
  }, []);

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoutes;

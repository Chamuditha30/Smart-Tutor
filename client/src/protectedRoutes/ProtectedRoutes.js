import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState([]);

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

  //if user not logged in redirect back to the login
  if (!user) {
    toast.error("Please login");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children; // Return the child components if the user is authorized
};

export default ProtectedRoutes;

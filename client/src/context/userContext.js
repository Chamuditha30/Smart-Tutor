import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      //check if user is in local storage
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.log("Error parsing stored user data: ", error);
          localStorage.removeItem("user"); //clear invalid data
        }
      } else {
        try {
          const { data } = await axios.get("/users/profile");
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUser();
  }, []); // Empty dependency array - only run on mount

  //logout user
  const logoutUser = async () => {
    try {
      await axios.post("/users/logout");
      setUser(null);
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  //update user
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: updateUser,
        logoutUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

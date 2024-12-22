import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState([]);

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
      toast.success("Logout successful");
      setUser([]);
      localStorage.removeItem("user");
      //set time out for show notification
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging in. Please try again");
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

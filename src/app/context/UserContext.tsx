"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  visible:false,
  setVisible : () =>{}
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
 const [visible, setVisible] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch {
        console.warn("Failed to parse stored user.");
      }
    }
  }, []);

  // Function to update user and localStorage
  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, visible, setVisible }}>

      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

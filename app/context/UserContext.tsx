"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  userKey :string;
}
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  isEditing: boolean,
  setIsEditing:(isEditing:boolean) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  visible:false,
  setVisible : () =>{},
  isEditing:false,
  setIsEditing:() =>{},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [visible, setVisible] = useState(false);
  const [isEditing,setIsEditing] = useState(false);
  // Load user from localStorage on mount
  useEffect(() => {
        const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))
      ?.split("=")[1];

    if(userCookie) {
      const parsedUser = JSON.parse(decodeURIComponent(userCookie));
      setUserState(parsedUser);
    }

  }, []);

  // Function to update user and localStorage
  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${7 * 24 * 60 * 60}`;
    } else {
       document.cookie = "user=; path=/; max-age=0";
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, visible, setVisible,isEditing,setIsEditing }}>

      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

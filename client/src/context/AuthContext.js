import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(()=>{
    // auth.getAuth()
  })
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // if(currentUser)
      setCurrentUser(user);
      const token=user.accessToken
      console.log("token",token);
      console.log("user",user);
      if(token){
        localStorage.setItem("@token",token)
      }
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

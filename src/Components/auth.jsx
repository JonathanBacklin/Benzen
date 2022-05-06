// ELIAZ KOD

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [pass, setpass] = useState(null)

  const login = (user) => {
    setuser(user);
    setpass(pass)
  };

  const logout = () => {
    setuser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext)
}

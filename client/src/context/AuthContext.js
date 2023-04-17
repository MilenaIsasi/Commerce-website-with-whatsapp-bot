import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggin, setIsLoggin] = useState(false);

  const toggleLogin = () => {
    setIsLoggin(!isLoggin);
  }

  return (
    <AuthContext.Provider value={{ isLoggin, toggleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

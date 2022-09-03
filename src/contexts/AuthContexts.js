import { createContext, useState } from "react";

export const AppContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [isWalletConnected, setWalletConnection] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <AppContext.Provider
      value={{
        isWalletConnected,
        setWalletConnection,
        walletAddress,
        setWalletAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AuthContextProvider;

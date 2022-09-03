import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContexts";

export const ProfileContext = createContext({});

const ProfileContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [bio, setBio] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [discord, setDiscord] = useState("");
  const [twitter, setTwitter] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [skills, setSkills] = useState([]);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  const { walletAddress: wa, isWalletConnected } = useContext(AuthContext);

  useEffect(() => {
    setWalletAddress(wa);
  }, [wa, isWalletConnected]);

  return (
    <ProfileContext.Provider
      value={{
        name,
        setName,
        walletAddress,
        setWalletAddress,
        bio,
        setBio,
        networkId,
        setNetworkId,
        discord,
        setDiscord,
        twitter,
        setTwitter,
        isVerified,
        setIsVerified,
        skills,
        setSkills,
        isProfileCompleted,
        setIsProfileCompleted,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default AuthContextProvider;

import {
  EmptyContainer,
  HeaderBox,
  MainBody,
} from "../components/styles/styledLayout";
import { AppContext } from "../contexts/AuthContexts";
import { useAccount } from "wagmi";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../helpercomponents/Header";

function Layout({ children }) {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const {
    isWalletConnected,
    setWalletConnection,
    walletAddress,
    setWalletAddress,
  } = useContext(AppContext);

  useEffect(() => {
    if (isConnected) {
      setWalletConnection(isConnected);
      setWalletAddress(address);
    } else {
      setWalletConnection(isConnected);
      setWalletAddress("");
    }
  }, []);

  useEffect(() => {
    if (isWalletConnected) {
      router.push("/profiledisplay");
    } else {
      router.push("/profiledisplay");
    }
  }, [isWalletConnected, walletAddress]);

  return (
    <EmptyContainer>
      <HeaderBox>
        <Header walletAddress={walletAddress} />
      </HeaderBox>
      <MainBody>{children}</MainBody>
    </EmptyContainer>
  );
}

export default Layout;

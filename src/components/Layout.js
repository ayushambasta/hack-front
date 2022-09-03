/* eslint-disable react-hooks/exhaustive-deps */
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
import axios from "axios";

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

  useEffect(async () => {
    var config = {
      method: "get",
      url: `http://localhost:5001/api/v1/users/address/${address}`,
      headers: {},
    };

    const response = await axios(config);

    if (isWalletConnected && response.data.data) {
      router.push("/explore");
    } else if (isWalletConnected) {
      router.push("/profile");
    } else {
      router.push("/");
    }
  }, [isWalletConnected, walletAddress]);

  return (
    <EmptyContainer>
      <HeaderBox>
        <Header isConnected={isConnected} walletAddress={walletAddress} />
      </HeaderBox>
      <MainBody>{children}</MainBody>
    </EmptyContainer>
  );
}

export default Layout;

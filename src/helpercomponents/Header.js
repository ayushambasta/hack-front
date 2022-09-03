import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { tokenABI } from "../components/ProfileComponent";

const MainBox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  border-bottom: 1px solid #303549;
`;

const LogoWrapper = styled(Box)``;

function Header({ walletAddress, isConnected }) {
  const [balance, setBalance] = useState("0");
  useEffect(() => {
    async function init() {
      if (walletAddress) {
        const web3Provider = await detectEthereumProvider();
        const provider = new ethers.providers.Web3Provider(web3Provider);

        const token = new ethers.Contract(
          "0x27CFBfFD67484163690c99519dAF91E36337B565",
          tokenABI,
          provider.getSigner()
        );
        const balance = await token.balanceOf(walletAddress);
        setBalance(balance.toString());
      }
    }
    init();
  }, [walletAddress]);
  return (
    <MainBox>
      <LogoWrapper>
        <Typography component={"h1"} fontWeight={900} fontSize={24}>
          Linkedin
        </Typography>
      </LogoWrapper>

      {isConnected ? (
        <LogoWrapper
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              marginRight: "20px",
              padding: "8px",
              background: "#123CF8",
              color: "white",
              borderRadius: "4px",
            }}
          >
            <Typography fontWeight={600}>
              Tank Balance: {balance} PFD
            </Typography>
          </Box>
          <ConnectButton></ConnectButton>
        </LogoWrapper>
      ) : null}
    </MainBox>
  );
}

export default Header;

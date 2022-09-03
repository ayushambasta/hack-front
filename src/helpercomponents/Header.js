import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
  return (
    <MainBox>
      <LogoWrapper>
        <Typography fontWeight={900} fontSize={24}>
          Linkedin
        </Typography>
      </LogoWrapper>

      {isConnected ? (
        <LogoWrapper>
          <ConnectButton></ConnectButton>
        </LogoWrapper>
      ) : null}
    </MainBox>
  );
}

export default Header;

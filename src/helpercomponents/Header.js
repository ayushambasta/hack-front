import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const MainBox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justiffy-content: space-between;
  padding: 0 15px;
`;

const LogoWrapper = styled(Box)``;

function Header({ walletAddress }) {
  return (
    <MainBox>
      <LogoWrapper>
        <Typography>Linkedin</Typography>
      </LogoWrapper>

      <LogoWrapper>
        <Chip label={walletAddress} variant="outlined" />
      </LogoWrapper>
    </MainBox>
  );
}

export default Header;

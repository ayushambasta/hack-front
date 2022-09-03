import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const EmptyPeopleTextWrapperStyled = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const HeaderBox = styled.div`
  width: 100vw;
  height: 80px;
`;

export const MainBody = styled.div`
  width: 100vw;
  height: Calc(100vh - 80px);
  background-color: #0a0e23;
`;

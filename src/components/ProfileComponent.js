import styled from "@emotion/styled";
import { Typography, Box, Stack, Chip, Button, TextField } from "@mui/material";
import InputField from "../helpercomponents/InputField";

const MainBox = styled(Box)`
  width: 719px;
  height: 453px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px;
  background: #181c31;
  border-radius: 8px;
`;

const WrapperBox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProfileComponent() {
  return (
    <WrapperBox>
      <MainBox>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ width: "100%" }}
        >
          <Typography component="h1">Profile Details</Typography>
          <Typography component="h4" mt={2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Typography>
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <InputField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{ background: "#0A0E23" }}
              type="text"
              onChange={(e) => {}}
              placeholder="Name"
              inputStyles={{
                width: "95%",
                alignItems: "flex-start",
                background: "#0A0E23",
                color: "#636B81",
                border: "none",
                lineHeight: 1.5,
              }}
            />
            <InputField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{ background: "#0A0E23" }}
              type="text"
              onChange={(e) => {}}
              placeholder="Name"
              inputStyles={{
                width: "95%",
                alignItems: "flex-start",
                background: "#0A0E23",
                color: "#636B81",
                border: "none",
                lineHeight: 1.5,
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
            mt={2}
          >
            <InputField
              id="outlined-basic"
              label="Twitter"
              variant="outlined"
              sx={{ background: "#0A0E23" }}
              type="text"
              onChange={(e) => {}}
              placeholder="Twitter"
              inputStyles={{
                width: "95%",
                alignItems: "flex-start",
                background: "#0A0E23",
                color: "#636B81",
                border: "none",
                lineHeight: 1.5,
              }}
            />
            <InputField
              id="outlined-basic"
              label="Discord"
              variant="outlined"
              sx={{ background: "#0A0E23" }}
              type="text"
              onChange={(e) => {}}
              placeholder="Discord"
              inputStyles={{
                width: "95%",
                alignItems: "flex-start",
                background: "#0A0E23",
                color: "#636B81",
                border: "none",
                lineHeight: 1.5,
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Box mt={2}>
              {["dev", "front"].map((item) => (
                <Chip label={item} variant="outlined" />
              ))}
            </Box>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Button>Cancel</Button>
          <Button variant="contained">Create Profile</Button>
        </Stack>
      </MainBox>
    </WrapperBox>
  );
}

export default ProfileComponent;

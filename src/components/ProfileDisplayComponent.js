import styled from "@emotion/styled";
import { Typography, Box, Stack, Chip, Button, TextField } from "@mui/material";

function ProfileDisplayComponent() {
  const connection = 21;
  const followers = 18;
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ maxWidth: "1344px" }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ width: "100%" }}
      ></Stack>
      <Stack>
        {" "}
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ width: "100%" }}
          divider={<span>.</span>}
        >
          <span>{`${connection} Connections`}</span>
          <span>{`${followers} Followers`}</span>
        </Stack>
      </Stack>
      <Stack></Stack>
    </Stack>
  );
}

export default ProfileDisplayComponent;

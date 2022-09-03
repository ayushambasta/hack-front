import styled from "@emotion/styled";
import { Typography, Box, Stack, Chip, Button, Divider } from "@mui/material";

const RenderInfo = ({ name, desc, isLink = false, href = "" }) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ width: "100%" }}
    >
      <Typography
        sx={{
          fontFamily: "Gilroy",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "12px",
          lineHeight: "14px",
          color: "#CCCED5",
        }}
      >
        {name}
      </Typography>
      {!isLink && (
        <Typography
          mt={2}
          sx={{
            fontFamily: "Gilroy",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "16px",
            color: "#FFFFFF",
          }}
        >
          {desc}
        </Typography>
      )}
      {isLink && (
        <Typography
          mt={2}
          sx={{
            fontFamily: "Gilroy",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "16px",
            color: "#BCFE2F",
          }}
        >
          <a href={href} target="_blank" style={{ textDecoration: "none" }}>
            {desc}
          </a>
        </Typography>
      )}
    </Stack>
  );
};

function ProfileDisplayComponent() {
  const connection = 21;
  const followers = 18;
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ width: "100%" }}
    >
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
          mt={2}
          sx={{ width: "100%" }}
        ></Stack>

        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          mt={2}
          sx={{ width: "100%" }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ width: "100%" }}
            divider={<span>{` . `}</span>}
          >
            <span>{`${connection} Connections`}</span>
            <span>{`${followers} Followers`}</span>
          </Stack>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            mt={2}
            sx={{ width: "100%" }}
          >
            <Typography component={"h2"}>Experience</Typography>
            <Typography component={"h6"} mt={1}>
              Redesigned the Bankless website, which was to improve the
              aesthetics and usability of the Web pages.
            </Typography>
          </Stack>
        </Stack>

        <Divider />

        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          mt={2}
          sx={{ width: "100%" }}
        >
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ width: "50%" }}
          >
            <Typography component={"h2"}>About me</Typography>
            <Typography component={"h6"} mt={2}>
              <span>
                I'm a Defi, Blockchain & Web 3.0 Product Designer helping DAOs
                and Enterprises build better products that are easily accessible
                and scalable.
              </span>
              <br />
              <span>
                I will help you in rafting beautiful, modern, and intuitive
                designs. I create impactful digital experiences that attract and
                engage, including creating, improving and build off, of
                wireframes to build high fidelity designs with detailed user
                research for the specific products. I have designed DAO Games,
                Academy MVPs, Governance System, Launchpads, Swaps, DEX, CEX,
                Mobile dApps, Wallets, Websites etc.
              </span>
            </Typography>
          </Stack>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ width: "25%" }}
          >
            <RenderInfo name={"Location"} desc={"Melbourne, Australia"} />
            <RenderInfo name={"Discord"} desc={"olirhye"} />
          </Stack>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ width: "25%" }}
          >
            <RenderInfo name={"Location"} desc={"Melbourne, Australia"} />
            <RenderInfo
              name={"Discord"}
              desc={"olirhye"}
              isLink={true}
              href={"www.google.com"}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ProfileDisplayComponent;

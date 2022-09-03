import styled from "@emotion/styled";
import { Typography, Box, Stack, Chip, Button, TextField } from "@mui/material";
import InputField from "../helpercomponents/InputField";

const MainBox = styled(Box)`
  width: 719px;
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
  const [rolls, setRolls] = useState([]);
  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const { address, isConnected } = useAccount();

  const handleSelectRole = (role) => {
    if (selectedRoles.includes(role)) {
      const roles = [...selectedRoles];
      roles.splice(selectedRoles.indexOf(role), 1);
      setSelectedRoles(roles);
    } else {
      const roles = [...selectedRoles];
      roles.push(role);
      setSelectedRoles(roles);
    }
  };

  useEffect(() => {
    const init = async () => {
      // To get All Roles
      var config = {
        method: "get",
        url: "http://localhost:5001/api/v1/users/rolls",
        headers: {},
      };

      const response = await axios(config);
      setRolls(response.data.data);
    };
    init();
  }, []);

  const router = useRouter();

  const submitProfile = async () => {
    const provider = new ethers.getDefaultProvider(4);
    const wallet = new Wallet(
      "46c071c1951a69a3bfad843d854d62131b1d414726280329e56d92fbca26cb30",
      provider
    );

    const GLD = new Contract(
      "0xFE87A5f12c08E1223efEafc462E777daeE6bE699",
      tokenABI,
      wallet
    );
    const response = await GLD.transfer(address, 10);

    console.log(response);

    var data = JSON.stringify({
      name: name,
      walletAddress: address,
      networkId: 4,
      discord: discord,
      twitter: twitter,
      isVerified: false,
      Skills: selectedRoles,
    });

    var config = {
      method: "post",
      url: "http://localhost:5001/api/v1/users",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        router.push("/explore");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <WrapperBox>
      <MainBox>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ width: "100%" }}
        >
          <Typography component="h1" fontWeight={700} fontSize={24}>
            Profile Details
          </Typography>
          <Typography component="h4" mt={2}>
            Create your profile with us to better experience the Multiverse of
            Networking
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
            sx={{
              width: "100%",
              padding: "12px",
              background: "#0A0E23",
              marginTop: "12px",
            }}
          >
            <Box>
              {rolls?.map((item) => (
                <Chip
                  onClick={() => handleSelectRole(item)}
                  style={{
                    margin: "4px",
                    cursor: "pointer",
                    color: selectedRoles.includes(item) ? "#BCFE2F" : "white",
                    border: selectedRoles.includes(item)
                      ? "1px solid #BCFE2F"
                      : "none",
                  }}
                  key={item}
                  label={item}
                  variant="outlined"
                />
              ))}
            </Box>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%", marginTop: "20px" }}
        >
          <Button>Cancel</Button>
          <Button
            style={{
              background: "#123CF8",
              color: "white",
            }}
            variant="contained"
            onClick={submitProfile}
          >
            Create Profile
          </Button>
        </Stack>
      </MainBox>
    </WrapperBox>
  );
}

export default ProfileComponent;

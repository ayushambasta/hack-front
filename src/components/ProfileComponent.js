import styled from "@emotion/styled";
import { Typography, Box, Stack, Chip, Button, TextField } from "@mui/material";
import axios from "axios";
import { Contract, ethers, Wallet } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export const tokenABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "reciever",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "withdrawl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

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
          <Typography fontWeight={700} fontSize={24}>
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
            <TextField
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.name)}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
            mt={2}
          >
            <TextField
              style={{ width: "50%" }}
              id="outlined-basic"
              label="Twitter"
              variant="outlined"
              placeholder="Enter Your Twitter"
              onChange={(e) => setTwitter(e.target.name)}
            />
            <TextField
              style={{ width: "50%", marginLeft: "8px" }}
              id="outlined-basic"
              label="Discord"
              variant="outlined"
              placeholder="Enter Your Discord "
              onChange={(e) => setDiscord(e.target.name)}
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

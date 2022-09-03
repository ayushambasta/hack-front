import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Chip, Button, Modal } from "@mui/material";
import { useAccount } from "wagmi";
import { ethers, Wallet, Contract } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { tokenABI } from "../src/components/ProfileComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function explore() {
  const [users, setUsers] = useState([]);
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reciver, setReciever] = useState("");
  const [id, setId] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const init = async () => {
      var config = {
        method: "get",
        url: "http://localhost:5001/api/v1/users",
        headers: {},
      };

      const response = await axios(config);

      setUsers(response.data.data);

      var config2 = {
        method: "get",
        url: `http://localhost:5001/api/v1/users/address/${address}`,
        headers: {},
      };
      const response2 = await axios(config2);
      setCurrentUser(response2.data.data[0]);
    };
    init();
  }, []);

  const sendRequest = async () => {
    const web3Provider = await detectEthereumProvider();
    const provider = new ethers.providers.Web3Provider(web3Provider);

    const token = new ethers.Contract(
      "0x27CFBfFD67484163690c99519dAF91E36337B565",
      tokenABI,
      provider.getSigner()
    );
    const resolve = await token.stake(reciver, 2);

    var data = JSON.stringify({
      friends: [currentUser.walletAddress],
    });

    var config = {
      method: "put",
      url: `http://localhost:5001/api/v1/users/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config);

    var config2 = {
      method: "get",
      url: "http://localhost:5001/api/v1/users",
      headers: {},
    };

    const response = await axios(config2);

    var config3 = {
      method: "get",
      url: `http://localhost:5001/api/v1/users/address/${address}`,
      headers: {},
    };
    const response2 = await axios(config3);
    setCurrentUser(response2.data.data[0]);

    setUsers(response.data.data);

    setOpen(false);
  };

  return (
    <div>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "2rem",
        }}
      >
        <Typography fontSize={24} fontWeight={900}>
          Explore
        </Typography>
        <Typography fontSize={16} fontWeight={500}>
          This is the start of legendary conversations with like-minded people
          from the space
        </Typography>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "70%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {users
            ?.filter((item) => item.walletAddress !== address)
            .map((item) => {
              return (
                <Box
                  style={{
                    background: "#181C31",
                    padding: "17px",
                    borderRadius: "8px",
                    width: "550px",
                    margin: "12px",
                    height: "280px",
                  }}
                  key={item.walletAddress}
                >
                  <Box style={{ display: "flex" }}>
                    <img
                      src={`https://cdn.stamp.fyi/avatar/${item.walletAddress}`}
                    />
                    <Box style={{ marginLeft: "16px" }}>
                      <Typography fontSize={24} fontWeight={900}>
                        {item.name}
                      </Typography>
                      <Typography fontSize={14} fontWeight={500}>
                        {item.walletAddress}
                      </Typography>
                    </Box>
                  </Box>
                  <Box style={{ marginTop: "24px" }}>
                    {item?.Skills?.map((item) => (
                      <Chip
                        style={{
                          margin: "4px",
                        }}
                        label={item}
                        key={item}
                      >
                        {item}
                      </Chip>
                    ))}
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      marginTop: "24px",
                      width: "100%",
                    }}
                  >
                    {item?.friends?.includes(currentUser.walletAddress) ? (
                      <Box>Connect Request Sent</Box>
                    ) : (
                      <>
                        {" "}
                        <Button
                          style={{
                            width: "50%",
                            color: "white",
                            border: "1px solid white",
                          }}
                          variant="outlined"
                        >
                          Follow
                        </Button>
                        <Button
                          onClick={() => {
                            setReciever(item.walletAddress);
                            setId(item._id);
                            setOpen(true);
                          }}
                          style={{
                            width: "50%",
                            marginLeft: "8px",
                            color: "white",
                            background: "#123CF8",
                          }}
                          variant={"contained"}
                        >
                          Connect
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
              );
            })}
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Send Connection Request
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure want to stake 2 Tokens
            </Typography>
            <Box
              style={{
                display: "flex",
                marginTop: "24px",
                width: "100%",
              }}
            >
              <Button
                style={{
                  width: "50%",
                  color: "white",
                  border: "1px solid white",
                }}
                variant="outlined"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  sendRequest();
                }}
                style={{
                  width: "50%",
                  marginLeft: "8px",
                  color: "white",
                  background: "#123CF8",
                }}
                variant={"contained"}
              >
                Connect
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

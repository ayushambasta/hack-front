import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";

import { Box, Typography, Chip, Button, Modal } from "@mui/material";

export default function request() {
  const { address } = useAccount();

  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);

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
  return (
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
        Invitations
      </Typography>
      <Typography fontSize={16} fontWeight={500}>
        This is the start of legendary conversations with like-minded people
        from the space
      </Typography>
    </Box>
  );
}

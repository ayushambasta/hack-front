import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Chip, Button } from "@mui/material";
import { useAccount } from "wagmi";

export default function explore() {
  const [users, setUsers] = useState([]);
  const { address } = useAccount();

  useEffect(() => {
    const init = async () => {
      var config = {
        method: "get",
        url: "http://localhost:5001/api/v1/users",
        headers: {},
      };

      const response = await axios(config);

      setUsers(response.data.data);
    };
    init();
  }, []);

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
              );
            })}
        </Box>
      </Box>
    </div>
  );
}

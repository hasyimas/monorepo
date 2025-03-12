import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { CLEAR_TOKEN, CLEAR_USER, setUser } from "@/store/actions";
const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: CLEAR_USER,
    });
    dispatch({
      type: CLEAR_TOKEN,
    });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      <Typography variant="body1"> Logout</Typography>
    </Button>
  );
};

export default LogoutButton;

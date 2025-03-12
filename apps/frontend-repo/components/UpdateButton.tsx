import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoading, setUserError, setUsers } from "@/store/actions";
import { fetchUserData } from "@/apis/userApi";
import { RootState } from "@/store/store";

const UpdateButton: React.FC = () => {
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch();
  const handleClick = async () => {
    dispatch(setUserLoading(true));
    try {
      const data = await fetchUserData();
      console.log(data);
      dispatch(setUsers(data));
      dispatch(setUserLoading(false));
    } catch (error: any) {
      dispatch(setUserError(error.message));
      dispatch(setUserLoading(false));
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick}>
        {userLoading ? (
          <Typography variant="body1"> Process Fetch Data </Typography>
        ) : (
          <Typography variant="body1"> Update User</Typography>
        )}
      </Button>
    </>
  );
};

export default UpdateButton;

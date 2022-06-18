import React from "react";
import { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "./context/authentication_context/AuthenticationContext";
import { useContext } from "react";
import { toast } from "react-toastify";

function LeftDrawer({ open, setOpen }) {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const navigate = useNavigate();
  const { userLoginDetails, Logout } = useContext(AuthenticationContext);

  const navigateHandler = (path) => {
    navigate(`/${path}`);
    setOpen(false);
  };
  const logoutHandler = () => {
    Logout();
    setOpen(false);
    navigate('/')
  };
  return (
    <>
      <SwipeableDrawer
        PaperProps={{
          sx: {
            backgroundColor: "#4B2515",
            color: "white",
            borderRadius: "0px 100px 0 0",
          },
        }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Box sx={{ width: 250 }}>
          <Box textAlign="center" sx={{ mt: 3, mr: 4 }}>
            <Typography variant="h4">Manxho</Typography>
          </Box>
          <Divider sx={{ border: 1 }} />
          <Box sx={{ mt: 2 }}>
            <List>
              {userLoginDetails ? (
                <>
                  <ListItem button onClick={() => navigateHandler("profile")}>
                    <ListItemText primary={"Profile"} />
                  </ListItem>
                  <ListItem onClick={logoutHandler} button>
                    <ListItemText primary={"Logout"} />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => (window.location = "https://manxho.co.in")}
                  >
                    <ListItemText primary={"Home"} />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem
                    button
                    onClick={() => (window.location = "https://manxho.co.in")}
                  >
                    <ListItemText primary={"Home"} />
                  </ListItem>

                  <ListItem button onClick={() => navigateHandler("signin")}>
                    <ListItemText primary={"Signin"} />
                  </ListItem>
                  <ListItem button onClick={() => navigateHandler("signup")}>
                    <ListItemText primary={"Signup"} />
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default LeftDrawer;

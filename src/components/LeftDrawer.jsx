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
  Link,
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
            backgroundColor: "#151515",
            color: "#eee",
            borderRadius: "0px 50px 0 0",
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

          <Box sx={{ mt: 6, ml: 3 }}>
            <List>
              {userLoginDetails ? (
                <>
                  <ListItem onClick={() => navigateHandler("profile")}>
                    <ListItemText primary={"Profile"} />
                  </ListItem>
                  <ListItem onClick={logoutHandler}>
                    <ListItemText primary={"Logout"} />
                  </ListItem>
                  <ListItem

                    onClick={() => (window.location = "/")}
                  >
                    <ListItemText primary={"Home"} />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem

                    onClick={() => (window.location = "/")}
                  >
                    <ListItemText primary={"Home"} />
                  </ListItem>

                  <ListItem onClick={() => navigateHandler("signin")}>
                    <ListItemText primary={"Signin"} />
                  </ListItem>
                  <ListItem onClick={() => navigateHandler("signup")}>
                    <ListItemText primary={"Signup"} />
                  </ListItem>

                </>
              )}

              <ListItem>
                <ListItemText primary={"Terms and Conditions"} />
              </ListItem>
              <ListItem >
                <ListItemText primary={"Privacy Policy"} />
              </ListItem>
              <ListItem >
                <Link target="_blank" href="https://www.manxho.co.in/">
                  <ListItemText primary={"Go to Main Site"} />
                </Link>
              </ListItem>
            </List>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default LeftDrawer;

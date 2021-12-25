import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import AuthContext from "../../store/auth-context";

import classes from "./Navigation.module.css";

export const Navigation = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const authCtx = useContext(AuthContext);

  const onLogoutHandler = () => {
    authCtx.logout();
  };

  const onChangePassword = () => {
    console.log("Change your password");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>EZ Travel</div>
      <nav className={classes.nav}>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/login">
                Login
              </NavLink>
            </li>
          )}

          {!authCtx.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/register">
                Register
              </NavLink>
            </li>
          )}

          {authCtx.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/home" exact>
                Home
              </NavLink>
            </li>
          )}

          {authCtx.isLoggedIn && authCtx.user.role === "admin" && (
            <li>
              <NavLink activeClassName={classes.active} to="/flights">
                Flights
              </NavLink>
            </li>
          )}

          <li>
            <NavLink activeClassName={classes.active} to="/contact-us">
              Contact us
            </NavLink>
          </li>

          {authCtx.isLoggedIn && (
            <li>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Typography textAlign="center">
                      <NavLink
                        style={{ textDecoration: "none", color: "#000" }}
                        to="/edit-user"
                      >
                        Edit my information
                      </NavLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography onClick={onChangePassword} textAlign="center">
                      Change password
                    </Typography>
                  </MenuItem>

                  <MenuItem>
                    <Typography onClick={onLogoutHandler} textAlign="center">
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

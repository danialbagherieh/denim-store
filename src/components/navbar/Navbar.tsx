// src/components/navbar/Navbar.tsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // 👈 added
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "./../../pages/Auth/authStore.ts";
import Search from "./search";
import Megamenu from "./MegaMenu";
import logo from "../../images/lacoste-seeklogo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          bgcolor: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  height: 50,
                  width: "auto",
                }}
              />
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                component={Link}
                to="/"
                color="inherit"
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    color: "#1976d2",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Home
              </Button>

              <Megamenu />

              <Button
                component={Link}
                to="/cart"
                color="inherit"
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    color: "#1976d2",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Cart
              </Button>

              <Button
                component={Link}
                to="/checkout"
                color="inherit"
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    color: "#1976d2",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Checkout
              </Button>

              {/* Professional User Menu */}
              {user ? (
                <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                  <IconButton
                    onClick={handleMenuOpen}
                    size="small"
                    sx={{
                      p: 0.5,
                      border: "2px solid transparent",
                      transition: "border-color 0.2s",
                      "&:hover": {
                        borderColor: "#1976d2",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: "#1976d2",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase() ||
                        user.email.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    slotProps={{
                      paper: {
                        sx: {
                          mt: 1.5,
                          minWidth: 200,
                          borderRadius: 2,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        },
                      },
                    }}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {user.name || user.email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleProfile}>
                      <AccountCircleIcon sx={{ mr: 1.5, fontSize: 20 }} />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    component={Link}
                    to="/signin"
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                    }}
                  >
                    <PersonIcon sx={{ mr: 0.5, fontSize: 18 }} />
                    Sign In
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      bgcolor: "#1976d2",
                      "&:hover": {
                        bgcolor: "#1565c0",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>

            <Search />

            {/* Mobile Hamburger */}
            <IconButton
              onClick={() => setOpenDrawer((prev) => !prev)}
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Space below fixed navbar */}
      <Toolbar />

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{
            width: 280,
            pt: 10,
            px: 2,
          }}
        >
          {/* 👇 Close button added here */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <IconButton onClick={() => setOpenDrawer(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* User section in drawer */}
          {user ? (
            <Box sx={{ mb: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                  {user.name?.charAt(0).toUpperCase() ||
                    user.email.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user.name || user.email}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Button
                component={Link}
                to="/signin"
                variant="outlined"
                fullWidth
                onClick={() => setOpenDrawer(false)}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                fullWidth
                onClick={() => setOpenDrawer(false)}
              >
                Sign Up
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/shop"
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemText primary="Shop" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/cart"
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemText primary="Cart" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/checkout"
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemText primary="Checkout" />
              </ListItemButton>
            </ListItem>

            {user && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/profile"
                    onClick={() => setOpenDrawer(false)}
                  >
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      logout();
                      setOpenDrawer(false);
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

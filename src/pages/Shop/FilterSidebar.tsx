import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  // Divider,
  Drawer,
  // Toolbar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import FiltersCheckboxes from "./Filtersidebar/FiltersCheckboxes.tsx";

import Ratingfilter from "./Filtersidebar/Ratingfilter.tsx";
// import Sizefilter from "./Filtersidebar/Sizefilter.tsx";
import Price from "./Filtersidebar/Sliderfilter.tsx";

const drawerWidth = 220;

interface Props {
  mobile?: boolean;
  window?: () => Window;
}

export default function FilterSidebar({ mobile = false, window }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <>
      <FiltersCheckboxes />
      <Price />

      <Ratingfilter />
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // ---------------- MOBILE ----------------

  if (mobile) {
    return (
      <>
        <Button
          variant="outlined"
          startIcon={<MenuIcon />}
          onClick={handleDrawerToggle}
        >
          Filters
        </Button>

        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              top: "64px", // or '70px' depending on your navbar height
              height: "calc(100% - 64px)",
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </>
    );
  }

  // ---------------- DESKTOP ----------------

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        open
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            position: "sticky",
            overflowY: "auto",
            width: drawerWidth,
            boxSizing: "border-box",
            top: 0,
            height: "100vh",
            margin: 0,
            padding: 0,
            borderRadius: 0,
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

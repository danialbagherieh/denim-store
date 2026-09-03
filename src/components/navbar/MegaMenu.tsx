import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";

import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function MegaMenu() {
  return (
    <Dropdown>
      <MenuButton
        sx={{
          bgcolor: "transparent !important",
          border: "none",
          boxShadow: "none",
          color: "inherit",
          fontSize: "0.875rem",
          fontWeight: 400,
          textTransform: "none",
          variant: "plain",

          "&:hover": {
            bgcolor: "transparent !important",
            color: "#1976d2",
            textTransform: "transparent",
            backgroundColor: "transparent",
          },
          "&:active": {
            bgcolor: "transparent !important",
          },

          "&:focus-visible": {
            bgcolor: "transparent !important",
          },
        }}
      >
        Shop
      </MenuButton>

      <Menu
        sx={{
          width: 700,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 4,
          }}
        >
          {/* Women */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Women
            </Typography>

            <Box
              component={Link}
              to="/shop?gender=women&fit=skinny"
              sx={linkStyle}
            >
              Skinny Jeans
            </Box>

            <Box
              component={Link}
              to="/shop?gender=women&fit=regular"
              sx={linkStyle}
            >
              Regular Jeans
            </Box>

            <Box
              component={Link}
              to="/shop?gender=women&fit=baggy"
              sx={linkStyle}
            >
              Baggy Jeans
            </Box>
          </Box>

          {/* Men */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Men
            </Typography>

            <Box
              component={Link}
              to="/shop?gender=men&fit=skinny"
              sx={linkStyle}
            >
              Skinny Jeans
            </Box>

            <Box
              component={Link}
              to="/shop?gender=men&fit=regular"
              sx={linkStyle}
            >
              Regular Jeans
            </Box>

            <Box
              component={Link}
              to="/shop?gender=men&fit=baggy"
              sx={linkStyle}
            >
              Baggy Jeans
            </Box>
          </Box>

          {/* Offers */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Offers
            </Typography>

            <Box component={Link} to="/shop?discount=true" sx={linkStyle}>
              All Product
            </Box>

          </Box>
        </Box>
      </Menu>
    </Dropdown>
  );
}

const linkStyle = {
  display: "block",
  textDecoration: "none",
  color: "#444",
  mb: 1.5,
  transition: "0.2s",

  "&:hover": {
    color: "#1976d2",
    paddingLeft: "5px",
  },
};

import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),

  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  marginLeft: 0,
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },

  "&:focus-within": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(
        1em + ${theme.spacing(1)}
      )`,

    transition: theme.transitions.create("width"),

    [theme.breakpoints.up("sm")]: {
      width: "20ch",

      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    const cleanedSearch = searchValue.trim();

    if (cleanedSearch) {
      navigate(`/shop?search=${encodeURIComponent(cleanedSearch)}`);
    } else {
      navigate("/shop");
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <StyledInputBase
        placeholder="Search products..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onKeyDown={handleKeyDown}
        inputProps={{
          "aria-label": "search",
        }}
      />
    </Search>
  );
}

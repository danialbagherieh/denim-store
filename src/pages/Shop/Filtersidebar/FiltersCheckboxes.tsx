// FiltersCheckboxes.tsx – default export combining all filter checkboxes

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const checkboxStyle = {
  m: 0,
  "& .MuiCheckbox-root": { p: 0.5 },
  "& .MuiFormControlLabel-label": { fontSize: 14 },
};

// ---------- Gender Filter ----------
function GenderFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGender = searchParams.get("gender");
  const genders = ["Men", "Women"];

  const handleGenderChange = (gender: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedGender === gender) params.delete("gender");
    else params.set("gender", gender);
    setSearchParams(params);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Gender
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto auto" }}>
        {genders.map((gender) => {
          const value = gender.toLowerCase();
          return (
            <FormControlLabel
              key={gender}
              sx={checkboxStyle}
              control={
                <Checkbox
                  size="small"
                  color="default"
                  checked={selectedGender === value}
                  onChange={() => handleGenderChange(value)}
                />
              }
              label={gender}
            />
          );
        })}
      </Box>
    </Box>
  );
}

// ---------- Fit Filter ----------
function FitFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFit = searchParams.get("fit");
  const fits = ["Skinny", "Regular", "Baggy"];

  const handleFitChange = (fit: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedFit === fit) params.delete("fit");
    else params.set("fit", fit);
    setSearchParams(params);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Fit
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto auto" }}>
        {fits.map((fit) => {
          const value = fit.toLowerCase();
          return (
            <FormControlLabel
              key={fit}
              sx={checkboxStyle}
              control={
                <Checkbox
                  size="small"
                  color="default"
                  checked={selectedFit === value}
                  onChange={() => handleFitChange(value)}
                />
              }
              label={fit}
            />
          );
        })}
      </Box>
    </Box>
  );
}

// ---------- Size Filter ----------
function SizeFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSize = searchParams.get("size");
  const sizes = ["XS", "SM", "MD", "LG", "XL"];

  const handleSizeChange = (size: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedSize === size) params.delete("size");
    else params.set("size", size);
    setSearchParams(params);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Size
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto auto" }}>
        {sizes.map((size) => (
          <FormControlLabel
            key={size}
            sx={checkboxStyle}
            control={
              <Checkbox
                size="small"
                color="default"
                checked={selectedSize === size}
                onChange={() => handleSizeChange(size)}
              />
            }
            label={size}
          />
        ))}
      </Box>
    </Box>
  );
}

// ---------- Color Filter ----------
function ColorFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedColor = searchParams.get("color");
  const colors = [
    { label: "Black", value: "black", color: "#000000" },
    { label: "Blue", value: "blue", color: "#1E40AF" },
    { label: "White", value: "white", color: "#FFFFFF" },
  ];

  const handleColorChange = (color: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedColor === color) params.delete("color");
    else params.set("color", color);
    setSearchParams(params);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Color
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto auto" }}>
        {colors.map((color) => (
          <FormControlLabel
            key={color.value}
            sx={checkboxStyle}
            control={
              <Checkbox
                size="small"
                color="default"
                checked={selectedColor === color.value}
                onChange={() => handleColorChange(color.value)}
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: color.color,
                    border: "1px solid #ccc",
                  }}
                />
                <Typography sx={{ fontSize: 14 }}>{color.label}</Typography>
              </Box>
            }
          />
        ))}
      </Box>
    </Box>
  );
}

// ---------- DEFAULT EXPORT – renders all four filters ----------
export default function FiltersCheckboxes() {
  return (
    <>
      <GenderFilter />
      <FitFilter />
      <SizeFilter />
      <ColorFilter />
    </>
  );
}

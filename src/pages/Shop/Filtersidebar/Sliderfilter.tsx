import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function valuetext(value: number) {
  return `$${value}`;
}

export default function SliderFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 150;

  const value = [minPrice, maxPrice];

  const handleChange = (_event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];

    const params = new URLSearchParams(searchParams);

    params.set("minPrice", String(min));
    params.set("maxPrice", String(max));

    setSearchParams(params);
  };

  return (
    <Box sx={{ width: 190, ml: 0, px: 0 }}>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          fontWeight: 600,
        }}
      >
        Price
      </Typography>

      <Box
        sx={{
          px: 1,
          display: "flex",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Typography variant="caption">${value[0]}</Typography>

        <Typography variant="caption">${value[1]}</Typography>
      </Box>

      <Box sx={{ px: 1, ml: 1 }}>
        <Slider
          sx={{
            color: "#222",
          }}
          size="small"
          min={0}
          max={150}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaLabel={() => "Price range"}
          getAriaValueText={valuetext}
        />
      </Box>
    </Box>
  );
}

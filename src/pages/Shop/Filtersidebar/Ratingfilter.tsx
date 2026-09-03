import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSearchParams } from "react-router-dom";

const ratings = [4, 3];

export default function RatingFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedRating = searchParams.get("rating") || "";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    const value = event.target.value;

    if (value === "") {
      params.delete("rating");
    } else {
      params.set("rating", value);
    }

    setSearchParams(params);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1,
          fontWeight: 600,
        }}
      >
        Rating
      </Typography>

      <RadioGroup value={selectedRating} onChange={handleChange}>
        <FormControlLabel
          value=""
          control={
            <Radio
              size="small"
              sx={{
                p: 0.25,
                mr: 0.5,
                "& .MuiSvgIcon-root": {
                  fontSize: 16,
                },
              }}
            />
          }
          label={<Typography variant="body2">All Ratings</Typography>}
          sx={{
            m: 0,
            mb: 0.5,
          }}
        />

        {ratings.map((rating) => (
          <FormControlLabel
            key={rating}
            value={String(rating)}
            sx={{
              m: 0,
              mb: 0.5,
              "& .MuiFormControlLabel-label": {
                width: "100%",
              },
            }}
            control={
              <Radio
                size="small"
                sx={{
                  p: 0.25,
                  mr: 0.5,
                  "& .MuiSvgIcon-root": {
                    fontSize: 16,
                  },
                }}
              />
            }
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Rating readOnly size="small" value={rating} />

                <Typography variant="body2">& Up</Typography>
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </Box>
  );
}

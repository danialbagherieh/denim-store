import { useState } from "react";

import { Card, CardContent, Typography } from "@mui/material";
import Button from "@mui/joy/Button";
import CardOverflow from "@mui/joy/CardOverflow";

import ProductModal from "./Productmodule.tsx";

type ProductProps = {
  id: number;
  name: string;
  gender: string;
  fit: string;
  image: string;
  price: number;
  rating: number;
  sizes: string[];
  stock: number;
  color: string;
  model: string;
};

export default function ProductCard({
  id,
  name,
  gender,
  fit,
  image,
  price,
  rating,
  sizes,
  stock,
  color,
  // model,
}: ProductProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            aspectRatio: "4 / 5",
          }}
        />

        <CardContent
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
            }}
          >
            {name}
          </Typography>

          {/* <Typography
            variant="body2"
            sx={{
              mt: 0.5,
              color: "text.secondary",
            }}
          >
            Model: {model}
          </Typography> */}

          <Typography
            variant="h6"
            sx={{
              mt: 1,
              fontWeight: 700,
            }}
          >
            ${price}
          </Typography>
        </CardContent>

        <CardOverflow sx={{ mt: "auto" }}>
          <Button
            size="lg"
            onClick={() => setOpen(true)}
            sx={{
              width: "100%",
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                bgcolor: "lightgrey",
              },
            }}
          >
            Add To Bag
          </Button>
        </CardOverflow>
      </Card>

      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        id={id}
        name={name}
        gender={gender}
        fit={fit}
        image={image}
        price={price}
        rating={rating}
        sizes={sizes}
        stock={stock}
        color={color}
      />
    </>
  );
}

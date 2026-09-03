import { useState } from "react";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";

import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import NumberSpinner from "../../components/NumberSpinner";

import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

import { useCartStore } from "../cart/Cartstore/Cartstore";

type ProductProps = {
  open: boolean;
  onClose: () => void;

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
};

export default function ProductCard({
  open,
  onClose,
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
}: ProductProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const images = [image, image, image, image];

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: {
            xs: "100%",
            sm: 500,
          },
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "md",
          p: 2,
          boxShadow: "lg",
          bgcolor: "background.body",
          position: "relative",
        }}
      >
        <ModalClose
          variant="plain"
          sx={{
            m: 0,
            p: 0,
            zIndex: 9999,
          }}
        />

        <Swiper
          style={
            {
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            } as React.CSSProperties
          }
          spaceBetween={10}
          navigation
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Product ${index + 1}`}
                style={{
                  width: "100%",
                  height: 500,
                  objectFit: "contain",
                  borderRadius: 10,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          style={{
            marginTop: 12,
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Thumb ${index + 1}`}
                style={{
                  width: "100%",
                  height: 60,
                  objectFit: "contain",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Typography sx={{ mt: 2, fontWeight: 700 }}>{name}</Typography>
        <Typography>Gender: {gender}</Typography>
        <Typography>Fit: {fit}</Typography>
        <Typography>Color: {color}</Typography>
        <Typography>Price: ${price}</Typography>

        <Rating
          name="product-rating"
          value={rating}
          precision={0.5}
          readOnly
          size="small"
        />

        <FormControl>
          <FormLabel>Size</FormLabel>

          <RadioGroup
            orientation="horizontal"
            value={selectedSize}
            onChange={(event) => setSelectedSize(event.target.value)}
          >
            {sizes.map((size) => (
              <Radio key={size} value={size} label={size} />
            ))}
          </RadioGroup>
        </FormControl>

        <NumberSpinner
          value={quantity}
          onValueChange={(value) => setQuantity(value ?? 1)}
          min={1}
          max={stock}
          disabled={stock <= 0}
          size="small"
        />

        <Typography
          sx={{
            mt: 1,
            color:
              stock <= 3
                ? "error.main"
                : stock <= 5
                  ? "warning.main"
                  : "success.main",
          }}
        >
          Only <b>{stock}</b> left in stock!
        </Typography>

        <Button
          fullWidth
          disabled={!selectedSize || stock <= 0}
          onClick={() => {
            addToCart({
              cartItemId: `${id}-${color}-${selectedSize}`,

              id,
              name,
              image,
              price,
              color,
              size: selectedSize,
              quantity,
              stock,
            });

            onClose();
          }}
          sx={{
            mt: 2,
            backgroundColor: "lightblue",
            color: "black",
            "&:hover": {
              bgcolor: "lightgrey",
            },
          }}
        >
          Add To Bag
        </Button>
      </Sheet>
    </Modal>
  );
}

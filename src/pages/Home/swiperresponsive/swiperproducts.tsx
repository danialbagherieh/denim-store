import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Rating from "@mui/material/Rating";
import NumberSpinner from "../../../components/NumberSpinner.tsx";
import { Box } from "@mui/material";

// Import cart store
import { useCartStore } from "../../cart/Cartstore/Cartstore.tsx";

// Import RadioGroup for size selection
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

// Import all 9 images
import img20 from "../../../images/finalimage/20.webp";
import img3 from "../../../images/finalimage/3.webp";
import img21 from "../../../images/finalimage/21.webp";
import img23 from "../../../images/finalimage/23.webp";
import img24 from "../../../images/finalimage/24.webp";
import img27 from "../../../images/finalimage/27.webp";
import img28 from "../../../images/finalimage/28.webp";
import img29 from "../../../images/finalimage/29.webp";
// 9th image – reuse img20 (replace with your actual 9th image)
import img9th from "../../../images/finalimage/20.webp";

import "./styles.css";

// Product data – exactly as in the original 9 files
const productData = [
  {
    id: 1,
    image: img20,
    gender: "WOMANS JEANS",
    name: "Skinny Fit Jeans",
    price: 69.5,
    stock: 4,
    scale: 1.1,
    modalScale: 1.1,
    rating: 4,
    sizes: ["S", "M", "L", "XL"],
    color: "Blue",
    fit: "Skinny",
  },
  {
    id: 2,
    image: img3,
    gender: "WOMANS JEANS",
    name: "Skinny Fit Jeans",
    price: 98.99,
    stock: 5,
    scale: 1.3,
    modalScale: 1.1,
    rating: 4,
    sizes: ["S", "M", "L", "XL"],
    color: "Black",
    fit: "Skinny",
  },
  {
    id: 3,
    image: img21,
    gender: "WOMANS JEANS",
    name: "Regular Fit Jeans",
    price: 60.33,
    stock: 2,
    scale: 1.3,
    modalScale: 1.1,
    rating: 4,
    sizes: ["S", "M", "L", "XL"],
    color: "Blue",
    fit: "Regular",
  },
  {
    id: 4,
    image: img23,
    gender: "MENS JEANS",
    name: "Skinny Fit Jeans",
    price: 78.99,
    stock: 4,
    scale: 1.1,
    modalScale: 1.1,
    rating: 4,
    sizes: ["S", "M", "L", "XL"],
    color: "Blue",
    fit: "Skinny",
  },
  {
    id: 5,
    image: img24,
    gender: "MENS JEANS",
    name: "Regular Fit Jeans",
    price: 70.99,
    stock: 6,
    scale: 1.3,
    modalScale: 1.1,
    rating: 4,
    sizes: ["S", "M", "L", "XL"],
    color: "Black",
    fit: "Regular",
  },
  {
    id: 6,
    image: img27,
    gender: "MENS JEANS",
    name: "Skinny Fit Jeans",
    price: 83.99,
    stock: 7,
    scale: 1.3,
    modalScale: 1.1,
    rating: 4,
    sizes: ["S", "M", "L", "XL"],
    color: "Blue",
    fit: "Skinny",
  },
  {
    id: 7,
    image: img28,
    gender: "MENS JEANS",
    name: "Skinny Fit Jeans",
    price: 75.99,
    stock: 4,
    scale: 1.3,
    modalScale: 1.1,
    rating: 4,
    sizes: ["S", "M", "L", "XL"],
    color: "Black",
    fit: "Skinny",
  },
  {
    id: 8,
    image: img29,
    gender: "MENS JEANS",
    name: "Skinny Fit Jeans",
    price: 81.99,
    stock: 6,
    scale: 1.2,
    modalScale: 1.1,
    rating: 4,
    sizes: ["S", "M", "L", "XL"],
    color: "Blue",
    fit: "Skinny",
  },
  {
    id: 9,
    image: img9th,
    gender: "WOMANS JEANS",
    name: "Relaxed Fit Jeans",
    price: 55.0,
    stock: 3,
    scale: 1.1,
    modalScale: 1.1,
    rating: 4,
    sizes: ["S", "M", "L", "XL"],
    color: "White",
    fit: "Relaxed",
  },
];

// Sub‑component for each product card (with its own modal)
function ProductCardItem({ product }: { product: (typeof productData)[0] }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperType | null>(
    null,
  );
  const [selectedSize, setSelectedSize] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);

  const { addToCart } = useCartStore();

  const images = [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addToCart({
      cartItemId: `${product.id}-${product.color}-${selectedSize}`,
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      color: product.color,
      size: selectedSize,
      quantity,
      stock: product.stock,
    });

    setOpen(false);
  };

  return (
    <>
      <Card sx={{ p: 0, m: 0, maxWidth: "100%", boxShadow: "lg" }}>
        <CardOverflow
          sx={{
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 400,
          }}
        >
          <img
            src={product.image}
            alt="Jeans"
            loading="lazy"
            style={{
              width: "100%",
              height: "350px",
              display: "block",
              objectFit: "contain",
              transform: `scale(${product.scale})`,
            }}
          />
        </CardOverflow>
        <CardContent>
          <Typography level="body-xs">{product.gender}</Typography>
          <Link
            href="#product-card"
            color="neutral"
            textColor="text.primary"
            overlay
            endDecorator={<ArrowOutwardIcon />}
            sx={{
              fontWeight: "md",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {product.name}
          </Link>
          <Typography level="title-lg" sx={{ mt: 1, fontWeight: "xl" }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography level="body-sm">
            (Only <b>{product.stock}</b> left in stock!)
          </Typography>
        </CardContent>
        <CardOverflow>
          <Button
            size="lg"
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                bgcolor: "lightgrey",
              },
            }}
          >
            Add to Bag
          </Button>
        </CardOverflow>
      </Card>

      {/* Modal – exactly like Productmodule.tsx */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
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

          <Typography sx={{ mt: 2, fontWeight: 700 }}>
            {product.name}
          </Typography>
          <Typography>Gender: {product.gender}</Typography>
          <Typography>Fit: {product.fit}</Typography>
          <Typography>Color: {product.color}</Typography>
          <Typography>Price: ${product.price.toFixed(2)}</Typography>

          <Rating
            name="product-rating"
            value={product.rating}
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
              {product.sizes.map((size) => (
                <Radio key={size} value={size} label={size} />
              ))}
            </RadioGroup>
          </FormControl>

          <NumberSpinner
            value={quantity}
            onValueChange={(value) => setQuantity(value ?? 1)}
            min={1}
            max={product.stock}
            disabled={product.stock <= 0}
            size="small"
          />

          <Typography
            sx={{
              mt: 1,
              color:
                product.stock <= 3
                  ? "error.main"
                  : product.stock <= 5
                    ? "warning.main"
                    : "success.main",
            }}
          >
            Only <b>{product.stock}</b> left in stock!
          </Typography>

          <Button
            fullWidth
            disabled={!selectedSize || product.stock <= 0}
            onClick={handleAddToCart}
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
    </>
  );
}

// Main component – Swiper slider with 9 products
export default function Swiperproducts() {
  return (
    <Box sx={{ mt: 6 }}>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 5 },
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        style={{ paddingBottom: "50px" }}
      >
        {productData.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCardItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

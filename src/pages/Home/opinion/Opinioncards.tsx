import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";

// Avatars – adjust path if your images are elsewhere
import Avatar1 from "../../../images/optimizeface/1.webp";
import Avatar2 from "../../../images/optimizeface/2.webp";
import Avatar3 from "../../../images/optimizeface/3.webp";
import Avatar4 from "../../../images/optimizeface/4.webp";
import Avatar5 from "../../../images/optimizeface/5.webp";
import Avatar6 from "../../../images/optimizeface/6.webp";

// All card data in one array
const opinionData = [
  {
    id: 1,
    avatar: Avatar1,
    name: "Sarah M",
    comment:
      '"These jeans fit perfectly. The fabric feels premium and the sizing was accurate."',
    purchase: "Baggy Fit Jeans",
    date: "12 March 2025",
    ratingValue: 5,
    ratingPrecision: 4,
  },
  {
    id: 2,
    avatar: Avatar2,
    name: "Emma katia",
    comment:
      '"Very comfortable and stylish. I ordered another pair in a different color."',
    purchase: "Skinny Fit Jeans",
    date: "18 december 2025",
    ratingValue: 5,
    ratingPrecision: 5,
  },
  {
    id: 3,
    avatar: Avatar3,
    name: "Michael Jones",
    comment: '"I feel wonderfull when i wear it"',
    purchase: "Regular Fit Jeans",
    date: "25 Automn 2025",
    ratingValue: 5,
    ratingPrecision: 5,
  },
  {
    id: 4,
    avatar: Avatar4,
    name: "joe dark",
    comment: '"that\'s a beatifull jean"',
    purchase: "Baggy Fit Jeans",
    date: "16 july 2025",
    ratingValue: 5,
    ratingPrecision: 5,
  },
  {
    id: 5,
    avatar: Avatar5,
    name: "Jessica Cuthberg",
    comment: '"that\'s make me great when i wear it"',
    purchase: "Skinny Fit Jeans",
    date: "11 june 2025",
    ratingValue: 5,
    ratingPrecision: 5,
  },
  {
    id: 6,
    avatar: Avatar6,
    name: "George M",
    comment: '"I\'m very happy to bought this."',
    purchase: "Regular Fit Jeans",
    date: "5 Automn 2025",
    ratingValue: 5,
    ratingPrecision: 4.5,
  },
];

export default function Opinioncards() {
  return (
    <Grid container spacing={0} sx={{ mt: 3 }}>
      {opinionData.map((item) => (
        <Grid
          key={item.id}
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            mt: 2,
          }}
        >
          <Card
            sx={{ width: 300, height: 250, maxWidth: "100%", boxShadow: "lg" }}
          >
            <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
              <Avatar
                alt={item.name}
                src={item.avatar}
                sx={{ width: 56, height: 56 }}
              />
              <Chip
                size="sm"
                variant="soft"
                color="primary"
                sx={{
                  mt: -1,
                  mb: 1,
                  border: "3px solid",
                  borderColor: "background.surface",
                }}
              >
                PRO
              </Chip>
              <Rating
                name="half-rating-read"
                defaultValue={item.ratingValue}
                precision={item.ratingPrecision}
                readOnly
              />
              <Typography level="title-lg">{item.name}</Typography>
              <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
                {item.comment}
              </Typography>
              <Typography>Purchased : {item.purchase}</Typography>
              <Typography>{item.date}</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 0,
                  mt: 2,
                  "& > button": { borderRadius: "2rem" },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

import { Card, CardContent, Typography, Box, Container } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import ReplayIcon from "@mui/icons-material/Replay";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const features = [
  {
    id: "shipping",
    title: "Free Shipping",
    description: "Free delivery on all orders over $50.",
    Icon: LocalShippingIcon,
    iconColor: "green",
  },
  {
    id: "payment",
    title: "Secure Payment",
    description: "Your payments are protected and encrypted.",
    Icon: SecurityIcon,
    iconColor: "blue",
  },
  {
    id: "returns",
    title: "Easy Returns",
    description: "Return any product within 30 days.",
    Icon: ReplayIcon,
    iconColor: "orange",
  },
  {
    id: "support",
    title: "24/7 Support",
    description: "Our team is always ready to help you.",
    Icon: SupportAgentIcon,
    iconColor: "lightblue",
  },
];

export default function FeatureCards() {
  return (
    // The Container centers the grid and adds horizontal padding
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "grid",
          gap: 2, // spacing between cards
          // Mobile: 1 column (full width)
          gridTemplateColumns: "repeat(1, 1fr)",
          // Tablet: 2 columns (50% each)
          "@media (min-width: 600px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          // Desktop: 4 columns (25% each) – perfectly centered
          "@media (min-width: 900px)": {
            gridTemplateColumns: "repeat(4, 1fr)",
          },
        }}
      >
        {features.map(({ id, title, description, Icon, iconColor }) => (
          <Card
            key={id}
            elevation={0}
            sx={{
              textAlign: "center",
              p: 2,
              height: "100%",
              bgcolor: "#f7f9fc",
            }}
          >
            <Icon sx={{ fontSize: 50, color: iconColor }} />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
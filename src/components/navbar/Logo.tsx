// import Box from "@mui/material/Box";
import Logos from "../../images/lacoste-seeklogo.png";
import { Link } from "react-router-dom";


export default function Logo() {
  return (
<Link to="/">
  <img
    src={Logos}
    alt="Logo"
    style={{
      height: "50px",
      width: "auto",
      display: "block",
    }}
  />
</Link>
  );
}
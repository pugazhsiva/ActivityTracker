import { Button } from "@mui/material";
import { Link } from "react-router";

export default function GOM() {
  return (
    <Button to="/app" component={Link}>
      app
    </Button>
  );
}

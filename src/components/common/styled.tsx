import { Card, CardContent, Stack, Typography, Button, Link } from "@mui/material";
import { StyledCardProps } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

const StyledCard = ({title, buttonText}: StyledCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  }
    return (
      <Card
        sx={{
          minWidth: 275,
          minHeight: 350,
          backgroundColor: "#fd7014cc",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h5" color="white">
              I am
            </Typography>
            <Typography variant="h3" color="white">
              {title}
            </Typography>
          </Stack>
        </CardContent>
        <Stack p={2}>
          <Button
            size="small"
            variant="outlined"
            sx={{ color: "white", border: "2px solid white" }}
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        </Stack>
      </Card>
    );
  };

  export default StyledCard;
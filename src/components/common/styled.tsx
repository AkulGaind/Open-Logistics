import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  LabelControllerProps,
  StyledCardProps
} from "../../interfaces/interfaces";

const StyledCard = ({ title, buttonText }: StyledCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
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

const labelController = ({ label, placeholder }: LabelControllerProps) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <TextField
        id={label}
        required
        placeholder={placeholder}
        // helperText={errors[label].message}
        {...register(label, { required: true })}
      />
    </>
  );
};

export { labelController, StyledCard };


import {
  Button,
  Card,
  CardContent,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  LabelControllerProps,
  StyledCardProps,
} from "../../interfaces/interfaces";
import myColors from "../../themes/colors";

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
        backgroundColor: "#ffcd29",
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

const LabelController = ({ label, placeholder }: LabelControllerProps) => {
  const {
    register,
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

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: myColors.backgroundGrey,
  },
  cursor: "pointer",
}));

const StyledTableCell = styled(TableCell)(() => ({
  minWidth: 75,
  wordWrap: "inherit",
  whiteSpace: "wrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const ScrollbarStyles = {
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: myColors.yellow.main,
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: myColors.backgroundGreyV2,
  },
};

export {
  LabelController,
  StyledCard,
  StyledTableRow,
  StyledTableCell,
  ScrollbarStyles,
};

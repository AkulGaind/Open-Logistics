import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  styled,
  alpha,
  TextField,
  InputBase,
  Grid,
} from "@mui/material";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const StyledInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(1),
    },
    "& .MuiInputBase-input": {
      borderRadius: 8,
      position: "relative",
      border: "1px solid",
      borderColor:
        theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.4)" : "#2D3843",
      fontSize: 16,

      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  const StyledNInput = styled(TextField)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(1),
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      position: "relative",
      border: "1px solid",
      borderColor:
        theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.4)" : "#2D3843",
      fontSize: 16,

      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Grid
      container
      gridTemplateColumns={"45% 45%"}
      p={"10% 7%"}
      gap={"10%"}
      alignItems={"center"}
    >
      <img
        src={"src/assets/images/logo.png"}
        style={{
          height: "40%",
          width: "40%",
          objectFit: "contain",
        }}
      ></img>
      <Stack spacing={3} minWidth={"50%"}>
        <Stack spacing={1.5}>
          <label htmlFor="">Email</label>
          <TextField
            placeholder="john.doe@email.com"
            sx={{ borderRadius: "50%" }}
          ></TextField>
        </Stack>
        <Stack spacing={1.5}>
          <label htmlFor="">Password</label>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            placeholder="************"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Stack>
        <div style={{ width: "150px" }}>
          <Button variant="contained" fullWidth>
            Login
          </Button>
        </div>
      </Stack>
    </Grid>
  );
};

export default LoginPage;

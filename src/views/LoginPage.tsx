import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "../interfaces/interfaces";
import { useLoginUserMutation } from "../redux/slices/serviceSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState: {},
  } = useForm<ILogin>();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const formSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    // dispatch(setRole(data.role));
    await loginUser(data).unwrap(); 
    console.log(data);
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
        <form onSubmit={handleSubmit(formSubmit)}>
          <Stack spacing={1.5} mb={2}>
            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              required
              placeholder="john.doe@email.com"
              helperText={errors.email?.message}
              {...register("email", { required: true })}
            />
          </Stack>
          <Stack spacing={1.5} mb={2}>
            <label htmlFor="password">Password</label>
            <TextField
              id="password"
              helperText={errors.password?.message}
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              placeholder="************"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack spacing={1.5} mb={2}>
            <label htmlFor="role">Role</label>
            <Select
              id="role"
              value={role}
              {...register("role")}
              onChange={handleChange}
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Shipper"}>Shipper</MenuItem>
              <MenuItem value={"Carrier"}>Carrier</MenuItem>
            </Select>
          </Stack>
          <div style={{ width: "150px" }}>
            <Button variant="contained" fullWidth type="submit">
              Login
            </Button>
          </div>
        </form>
      </Stack>
    </Grid>
  );
};

export default LoginPage;

import { SubmitHandler, useForm } from "react-hook-form";
import { ISignUp } from "../interfaces/interfaces";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSignUpUserMutation } from "../redux/slices/serviceSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "../validationSchemas/signUpSchema";
import { setAppRole } from "../redux/slices/appStateSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();
  const [signUpUser] = useSignUpUserMutation();
  const dispatch = useDispatch();
  const defaultValues: ISignUp = {
    username: "",
    email: "",
    password: "",
    phone: "",
    company: "",
    role: "",
  };
  const method = useForm<ISignUp>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(signUpSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState: {},
  } = method;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const formSubmit: SubmitHandler<ISignUp> = async (data: ISignUp) => {
    dispatch(setAppRole(data.role));
    await signUpUser(data).unwrap();
    navigate("/dashboard");
  };

  return (
    <Stack alignItems={"center"} mt={4} spacing={8}>
      <Typography variant="h2">Sign-Up</Typography>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Stack spacing={4} alignItems={"center"}>
          <Grid container gridTemplateColumns={"50% 50%"} gap={10}>
            <Stack spacing={2}>
              <label htmlFor="name">Name</label>
              <TextField
                id="name"
                required
                placeholder="Name"
                helperText={errors.username?.message}
                {...register("username", { required: true })}
              />
              <label htmlFor="phone">Phone</label>
              <TextField
                id="phone"
                required
                placeholder="9876543210"
                helperText={errors.phone?.message}
                {...register("phone", { required: true })}
              />
              <label htmlFor="company">Company</label>
              <TextField
                id="company"
                required
                placeholder="Infosys"
                helperText={errors.company?.message}
                {...register("company", { required: true })}
              />
            </Stack>
            <Stack spacing={2}>
              <label htmlFor="email">Email</label>
              <TextField
                id="email"
                required
                placeholder="john.doe@email.com"
                helperText={errors.email?.message}
                {...register("email", { required: true })}
              />

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
          </Grid>
          <div style={{ width: "150px" }}>
            <Button variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </div>
        </Stack>
      </form>
    </Stack>
  );
};
export default SignupPage;

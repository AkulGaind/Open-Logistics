import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../interfaces/interfaces";
import { setAppRole } from "../redux/slices/appStateSlice";
import { useLoginUserMutation } from "../redux/slices/serviceSlice";
import loginSchema from "../validationSchemas/loginSchema";
import { APIResult } from "../utility/constants";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const defaultValues: ILogin = {
    email: "",
    password: "",
  };
  const method = useForm<ILogin>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(loginSchema),
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

  const formSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    const { message, role } = await loginUser(data).unwrap();
    if (message === APIResult.loginSuccess) {
      dispatch(setAppRole(role));
      navigate("/dashboard");
    }
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
        src={"src/assets/images/login.png"}
        style={{
          height: "40%",
          width: "40%",
          objectFit: "contain",
        }}
      ></img>
      <Stack spacing={3} minWidth={"50%"}>
        <FormProvider {...method}>
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
            <div style={{ width: "150px" }}>
              <Button variant="contained" fullWidth type="submit">
                Login
              </Button>
            </div>
          </form>
        </FormProvider>
      </Stack>
    </Grid>
  );
};

export default LoginPage;

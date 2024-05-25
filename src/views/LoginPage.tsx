import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LocalPostOfficeTwoToneIcon from "@mui/icons-material/LocalPostOfficeTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
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
import {
  setAppRole,
  setLoggedIn,
  setUserId,
} from "../redux/slices/appStateSlice";
import {
  useLoginUserMutation
} from "../redux/slices/serviceSlice";
import { APIResult } from "../utility/constants";
import loginSchema from "../validationSchemas/loginSchema";

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
    try {
      const { msg, roles, userId } = await loginUser(data).unwrap();
      if (msg === APIResult.loginSuccess) {
        dispatch(setAppRole(roles!));
        dispatch(setUserId(userId));
        dispatch(setLoggedIn(true));
        switch (roles) {
          case "Admin":
            navigate("/admin");
            break;
          case "Shipper":
            navigate("/loadposting");
            break;
          case "Carrier":
            navigate("/carrierdash");
            break;
        }
      }
    } catch (error) {
      console.log("Error while logging in: ", error);
    }
  };

  return (
    <Grid
      container
      gridTemplateColumns={"45% 45%"}
      p={"3%"}
      gap={"3%"}
      alignItems={"center"}
    >
      <img
        src={"src/assets/images/login.png"}
        alt="Login Image"
        style={{
          height: "40%",
          width: "40%",
          objectFit: "contain",
        }}
      ></img>
      <Stack spacing={3} minWidth={"50%"}>
        <FormProvider {...method}>
          <form onSubmit={handleSubmit(formSubmit)}>
            <Stack spacing={6}>
              <TextField
                id="email"
                variant="outlined"
                label="Email"
                placeholder="john.doe@email.com"
                helperText={errors.email?.message}
                {...register("email", { required: true })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPostOfficeTwoToneIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ height: 50 }}
              />
              <TextField
                id="password"
                helperText={errors.password?.message}
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="************"
                label="Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockTwoToneIcon fontSize="small" />
                    </InputAdornment>
                  ),
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
                sx={{ height: 50 }}
              />
            </Stack>
            <div style={{ width: "150px", marginTop: "35px" }}>
              <Button variant="contained" fullWidth type="submit">
                Continue
              </Button>
            </div>
          </form>
        </FormProvider>
      </Stack>
    </Grid>
  );
};

export default LoginPage;

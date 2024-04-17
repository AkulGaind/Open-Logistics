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
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "../interfaces/interfaces";
import { useLoginUserMutation } from "../redux/slices/serviceSlice";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../validationSchemas/loginSchema";
import { setAppRole } from "../redux/slices/appStateSlice";
import { useNavigate } from "react-router-dom";
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import LocalPostOfficeTwoToneIcon from '@mui/icons-material/LocalPostOfficeTwoTone';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const defaultValues: ILogin = {
    email: "",
    password: "",
    role: "",
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

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const formSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    // await loginUser(data).unwrap();
    dispatch(setAppRole(data.role));
    navigate("/dashboard");
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
              <TextField
                id="email"  
                variant="outlined"
                label="Email"
                placeholder="john.doe@email.com"
                helperText={errors.email?.message}
                {...register("email", { required: true })}
                InputProps={{
                  startAdornment:(
                    <InputAdornment position="start">
                    <LocalPostOfficeTwoToneIcon  fontSize="small"/>
                  </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={1.5} mb={2}>
              <TextField
                id="password"
                helperText={errors.password?.message}
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="************"
                label="Password"
                InputProps={{
                  startAdornment:(
                    <InputAdornment position="start">
                    <LockTwoToneIcon  fontSize="small"/>
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
              />
            </Stack>

            <div style={{ width: "150px" }}>
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

import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import Diversity3TwoToneIcon from "@mui/icons-material/Diversity3TwoTone";
import LocalPostOfficeTwoToneIcon from "@mui/icons-material/LocalPostOfficeTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ISignUp } from "../interfaces/interfaces";
import {
  setAppRole,
  setLoading,
  setLoggedIn,
  setUserId,
} from "../redux/slices/appStateSlice";
import { useSignUpUserMutation } from "../redux/slices/serviceSlice";
import { APIResult } from "../utility/constants";
import signUpSchema from "../validationSchemas/signUpSchema";
import { RootState } from "../redux/store/store";
import PageLoader from "../components/common/PageLoader";
import CustomSnackBar from "../components/common/Snackbar";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<AlertColor>("success");
  const navigate = useNavigate();
  const [signUpUser] = useSignUpUserMutation();
  const { loading } = useSelector((state: RootState) => state.appState);
  const dispatch = useDispatch();

  const defaultValues: ISignUp = {
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
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
  } = method;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleSnackClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const formSubmit: SubmitHandler<ISignUp> = async (data: ISignUp) => {
    dispatch(setLoading(true));
    try {
      const { msg, userId } = await signUpUser(data).unwrap();
      if (msg === APIResult.signUpSuccess) {
        setSnackOpen(true);
        setText("User Registered Successfully!");
        setStatus("success");
        dispatch(setAppRole(data.role));
        dispatch(setUserId(userId!));
        dispatch(setLoggedIn(true));
        setTimeout(() => {
          switch (data.role) {
            case "Admin":
              navigate("/admindash");
              break;
            case "Shipper":
              navigate("/shipperdash");
              break;
            case "Carrier":
              navigate("/carrierdash");
              break;
          }
        }, 5000);
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log("Error while signing in:", error);
      setSnackOpen(true);
      setText("Error while signing in. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <Box padding={8}>
          <FormProvider {...method}>
            <form onSubmit={handleSubmit(formSubmit)}>
              <Stack spacing={10} alignItems={"center"}>
                <img
                  alt="Signup Image"
                  src={"src/assets/images/signup.png"}
                  style={{
                    marginTop: "-50px",
                    height: "100px",
                    width: "100px",
                    objectFit: "contain",
                  }}
                ></img>
                <Grid
                  container
                  gridTemplateColumns={"50% 50%"}
                  justifyContent={"space-evenly"}
                >
                  <Stack spacing={6} minWidth={"45%"}>
                    <TextField
                      id="name"
                      placeholder="Name"
                      label="Name"
                      helperText={errors.username?.message}
                      {...register("username", { required: true })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleTwoToneIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ height: 50 }}
                    />
                    <TextField
                      id="phone"
                      placeholder="9876543210"
                      label="Phone"
                      helperText={errors.phone?.message}
                      {...register("phone", { required: true })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneTwoToneIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ height: 50 }}
                    />
                    <TextField
                      id="company"
                      placeholder="XYZ International"
                      label="Address"
                      helperText={errors.address?.message}
                      {...register("address", { required: true })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessTwoToneIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ height: 50 }}
                    />
                  </Stack>
                  <Stack spacing={6} minWidth={"45%"}>
                    <TextField
                      id="email"
                      placeholder="john.doe@email.com"
                      label="Email"
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ height: 50 }}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Select
                        id="role"
                        label="Role"
                        value={role}
                        labelId="demo-simple-select-label"
                        {...register("role")}
                        onChange={handleChange}
                        startAdornment={
                          <InputAdornment position="start">
                            <Diversity3TwoToneIcon />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                        <MenuItem value={"Shipper"}>Shipper</MenuItem>
                        <MenuItem value={"Carrier"}>Carrier</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
                <div style={{ width: "150px" }}>
                  <Button variant="contained" fullWidth type="submit">
                    Submit
                  </Button>
                </div>
              </Stack>
            </form>
          </FormProvider>
        </Box>
      )}
      <CustomSnackBar
        open={snackOpen}
        text={text}
        status={status}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose}></Alert>
      </CustomSnackBar>
    </>
  );
};
export default SignupPage;

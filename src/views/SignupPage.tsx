import { SubmitHandler, useForm } from "react-hook-form";
import { ISignUp } from "../interfaces/interfaces";
import {
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
  TextField
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSignUpUserMutation } from "../redux/slices/serviceSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "../validationSchemas/signUpSchema";
import { setAppRole } from "../redux/slices/appStateSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LocalPostOfficeTwoToneIcon from '@mui/icons-material/LocalPostOfficeTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import PhoneTwoToneIcon from '@mui/icons-material/PhoneTwoTone';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import Diversity3TwoToneIcon from '@mui/icons-material/Diversity3TwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';

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
    <Stack alignItems={"center"} spacing={8}>
      <img 
        src={"src/assets/images/signup.png"}
        style={{
          marginTop:"10px",
          height: "100px",
          width: "100px",
          objectFit: "contain",
        }}></img>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Stack spacing={4} alignItems={"center"}>
          <Grid container gridTemplateColumns={"50% 50%"} gap={10}>
            <Stack spacing={4}>
             
              <TextField
                id="name"
                placeholder="Name"
                label="Name"
                helperText={errors.username?.message}
                {...register("username", { required: true })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleTwoToneIcon  fontSize="small"/>
                    </InputAdornment>
                  ),
                }}
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
                      <PhoneTwoToneIcon  fontSize="small"/>
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                id="company"
                placeholder="XYZ International"
                label="Company"
                helperText={errors.company?.message}
                {...register("company", { required: true })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessTwoToneIcon  fontSize="small"/>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={4}>
           
              <TextField
                id="email"
                placeholder="john.doe@email.com"
                label="Email"
                helperText={errors.email?.message}
                {...register("email", { required: true })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPostOfficeTwoToneIcon fontSize="small"/>
                    </InputAdornment>
                  ),
                }}
              />

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
                      <LockTwoToneIcon fontSize="small"/>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" >
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
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                id="role"
                label="Role"
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
            <Button variant="contained"  fullWidth type="submit">
              Submit
            </Button>
          </div>
        </Stack>
      </form>
    </Stack>
  );
};
export default SignupPage;

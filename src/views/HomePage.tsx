import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Typewriter, { TypewriterClass } from "typewriter-effect";
import backgroundImage from "../assets/images/truck.png";
import { IContactDetails } from "../interfaces/interfaces";
import { useContactUsMutation } from "../redux/slices/serviceSlice";
import myColors from "../themes/colors";
import { APIResult } from "../utility/constants";
import contactDetailsSchema from "../validationSchemas/contactDetailsSchema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { setLoading } from "../redux/slices/appStateSlice";
import PageLoader from "../components/common/PageLoader";
import { useState } from "react";
import CustomSnackBar from "../components/common/Snackbar";

const HomePage = () => {
  const navigate = useNavigate();
  const [contactUs] = useContactUsMutation();
  const { loading } = useSelector((state: RootState) => state.appState);
  const dispatch = useDispatch();
  const [snackOpen, setSnackOpen] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<AlertColor>("success");

  const defaultValues: IContactDetails = {
    username: "",
    email: "",
    message: "",
  };
  const method = useForm<IContactDetails>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(contactDetailsSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;

  const handleSnackClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const formSubmit: SubmitHandler<IContactDetails> = async (
    data: IContactDetails
  ) => {
    dispatch(setLoading(true));
    try {
      console.log(data);
      const { msg } = await contactUs(data).unwrap();
      if (msg === APIResult.contactUsSuccess) {
        setSnackOpen(true);
        setText("Message Sent Successfully!");
        setStatus("success");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error while contacting:", error);
      setSnackOpen(true);
      setText("Error while contacting. Please try again.");
      setStatus("error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <Box pt={5} pl={10} pr={10} pb={10}>
          <div
            className="imageContainer"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              height: "80vh",
              display: "flex",
              position: "relative",
              objectFit: "contain",
            }}
          >
            <div>
              <Typography
                sx={{
                  color: myColors.textBlack,
                  maxWidth: "580px",
                  paddingTop: "50px",
                }}
                variant="h2"
                fontSize={"45px"}
                fontWeight={600}
              >
                <Typewriter
                  onInit={(typewriter: TypewriterClass) => {
                    typewriter
                      .changeDelay(50)
                      .typeString(
                        "Bridge the gap between shippers and carriers with connectivity"
                      )
                      .pauseFor(1200)
                      .changeDeleteSpeed(30)
                      .deleteChars(12)
                      .typeString("seamless connectivity")
                      .start();
                  }}
                />
              </Typography>
            </div>
          </div>
          <Box paddingBottom={10}>
            <Typography
              sx={{
                color: myColors.yellow.main,
                maxWidth: "580px",
                paddingBottom: "30px",
              }}
              variant="h2"
              fontSize={"45px"}
              fontWeight={600}
            >
              About
            </Typography>
            <Stack direction={"row"} spacing={3} alignItems={"center"}>
              <Stack spacing={4}>
                <Typography>
                  Welcome to{" "}
                  <span
                    style={{ color: myColors.yellow.main, fontWeight: 600 }}
                  >
                    OPEN LOGISTICS
                  </span>
                  , your ultimate solution for streamlined logistics management.
                  Our platform simplifies the intricate process of connecting
                  brokers, shippers, and carriers seamlessly.
                </Typography>
                <Typography>
                  Empowering brokers, our software enables efficient searching,
                  inviting, and managing of up to five shippers, ensuring
                  personalized attention to each client. Once verified, shippers
                  gain access to a comprehensive profile setup, facilitating
                  smooth product shipments or logistics services utilization.
                </Typography>
                <Typography>
                  For shippers, our platform offers hassle-free load
                  submissions, effortlessly connecting them with reliable
                  carriers, truck owners, or dispatchers. Brokers take charge of
                  all shipping requirements, liaising with dispatchers to ensure
                  prompt and efficient transportation services.
                </Typography>
              </Stack>
              <img
                src={"src/assets/images/about.png"}
                style={{
                  height: "35%",
                  width: "35%",
                }}
              ></img>
            </Stack>
          </Box>
          <Box paddingBottom={10}>
            <Typography
              sx={{
                color: myColors.yellow.main,
                maxWidth: "580px",
              }}
              variant="h2"
              fontSize={"45px"}
              fontWeight={600}
            >
              Contact Us
            </Typography>
            <Grid
              container
              gridTemplateColumns={"1fr 1fr"}
              alignItems={"center"}
            >
              <img
                src={"src/assets/images/contactUs.png"}
                alt="contactUs"
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
                        InputProps={{
                          style: {
                            borderRadius: "10px",
                          },
                        }}
                        id="name"
                        variant="outlined"
                        label="Name"
                        placeholder="John Doe"
                        helperText={errors.username?.message}
                        {...register("username", { required: true })}
                      />
                    </Stack>
                    <Stack spacing={1.5} mb={2}>
                      <TextField
                        InputProps={{
                          style: {
                            borderRadius: "10px",
                          },
                        }}
                        id="email"
                        variant="outlined"
                        label="Email"
                        placeholder="john.doe@email.com"
                        helperText={errors.email?.message}
                        {...register("email", { required: true })}
                      />
                    </Stack>
                    <Stack spacing={1.5} mb={2}>
                      <TextField
                        InputProps={{
                          style: {
                            borderRadius: "10px",
                          },
                        }}
                        id="message"
                        variant="outlined"
                        label="Message"
                        placeholder="description"
                        helperText={errors.message?.message}
                        {...register("message", { required: true })}
                      />
                    </Stack>
                    <div style={{ width: "150px" }}>
                      <Button variant="contained" fullWidth type="submit">
                        Submit
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </Stack>
            </Grid>
          </Box>
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

export default HomePage;

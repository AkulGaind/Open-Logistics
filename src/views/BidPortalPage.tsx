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
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import PageLoader from "../components/common/PageLoader";
import CustomSnackBar from "../components/common/Snackbar";
import { IBidPortal } from "../interfaces/interfaces";
import { setLoading } from "../redux/slices/appStateSlice";
import { useBidPortalMutation } from "../redux/slices/serviceSlice";
import { RootState } from "../redux/store/store";
import myColors from "../themes/colors";
import { APIResult } from "../utility/constants";
import bidPortalSchema from "../validationSchemas/bidPortalSchema";

const BidPortalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bidPortal] = useBidPortalMutation();
  const dispatch = useDispatch();
  const { userId, loading } = useSelector((state: RootState) => state.appState);
  const [snackOpen, setSnackOpen] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<AlertColor>("success");
  const {
    shipperId,
    shipperName,
    shipperEmail,
    shipperPhone,
    shipperAddress,
    origin,
    destination,
    shipmentType,
    shipmentWeightVolume,
    pickupDateTime,
    deliveryDateTime,
    addDetails,
  } = location.state;

  const defaultValues: { bidAmount: string } = {
    bidAmount: "",
  };
  const method = useForm<{ bidAmount: string }>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(bidPortalSchema),
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

  const formSubmit: SubmitHandler<{ bidAmount: string }> = async (data: {
    bidAmount: string;
  }) => {
    try {
      const biddingDetails: IBidPortal = {
        shipperName: shipperName,
        shipperEmail: shipperEmail,
        shipperPhone: shipperPhone,
        shipperAddress: shipperAddress,
        bidAmount: data.bidAmount,
        origin: origin,
        destination: destination,
        shipmentType: shipmentType,
        shipmentWeightVolume: shipmentWeightVolume,
        pickupDateTime: pickupDateTime,
        deliveryDateTime: deliveryDateTime,
        addDetails: addDetails,
      };
      const { msg } = await bidPortal({ userId, biddingDetails, shipperId }).unwrap();
      if (msg === APIResult.bidPortalSuccess) {
        dispatch(setLoading(true));
        setSnackOpen(true);
        setText("Bid Placed Successfully!");
        setStatus("success");
        setTimeout(() => {
          navigate("/carrierdashboard");
        }, 5000);
      }
    } catch (error) {
      console.log("Failed to fetch bid portal data:", error);
      setSnackOpen(true);
      setText("Error while fetching bid portal data. Please try again.");
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
        <Box padding={8}>
          <FormProvider {...method}>
            <form onSubmit={handleSubmit(formSubmit)}>
              <Typography
                sx={{
                  color: myColors.textBlack,
                  maxWidth: "580px",
                }}
                variant="h2"
                fontSize={"45px"}
                fontWeight={600}
                paddingBottom={10}
              >
                Bid Portal
              </Typography>
              <Stack spacing={2} paddingBottom={5}>
                <Typography
                  sx={{
                    color: myColors.textBlack,
                    maxWidth: "580px",
                  }}
                  variant="h5"
                >
                  Shipper Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <label>Shipper Name</label>
                    <TextField
                      fullWidth
                      value={shipperName}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <label>Shipper Address</label>
                    <TextField
                      fullWidth
                      value={shipperAddress}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <label>Shipper Contact Number</label>
                    <TextField
                      fullWidth
                      value={shipperPhone}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={2} paddingBottom={5}>
                <Typography
                  sx={{
                    color: myColors.textBlack,
                    maxWidth: "580px",
                  }}
                  variant="h5"
                >
                  Shipment Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <label>Origin</label>
                    <TextField
                      fullWidth
                      value={origin}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <label>Destination</label>
                    <TextField
                      fullWidth
                      value={destination}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <label>Shipment Type</label>
                    <TextField
                      fullWidth
                      value={shipmentType}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row">
                      <Grid>
                        <label>Shipment Weight or Volume</label>
                        <TextField
                          fullWidth
                          value={shipmentWeightVolume}
                          variant="standard"
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid>
                        <label>Shipment Units</label>
                        <TextField
                          fullWidth
                          value={"Kg"}
                          variant="standard"
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <label>Preferred Pickup Date/Time</label>
                    <TextField
                      fullWidth
                      value={new Date(pickupDateTime).toLocaleDateString()}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <label>Preferred Delivery Date/Time</label>
                    <TextField
                      fullWidth
                      value={new Date(deliveryDateTime).toLocaleDateString()}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={2} paddingBottom={5}>
                <Typography
                  sx={{
                    color: myColors.textBlack,
                    maxWidth: "580px",
                  }}
                  variant="h5"
                >
                  Place Bid
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <label>Minimum Bid</label>
                    <TextField
                      fullWidth
                      value={"xxxxxxxxxx"}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Enter Bid Amount"
                      variant="standard"
                      id="bidAmount"
                      InputProps={{
                        style: {
                          borderRadius: "10px",
                        },
                      }}
                      required
                      helperText={errors.bidAmount?.message}
                      {...register("bidAmount", { required: true })}
                      sx={{ height: 50 }}
                    />
                    <div
                      style={{
                        width: "150px",
                        display: "flex",
                        margin: "20% -30% 0",
                      }}
                    >
                      <Button variant="contained" fullWidth type="submit">
                        Proceed
                      </Button>
                    </div>
                  </Grid>
                </Grid>
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

export default BidPortalPage;

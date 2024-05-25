import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ILoadPosting } from "../interfaces/interfaces";
import { useLoadPostingMutation } from "../redux/slices/serviceSlice";
import myColors from "../themes/colors";
import { APIResult, shipment_type } from "../utility/constants";
import loadPostingSchema from "../validationSchemas/loadPostingSchema";
import DateTimeController from "../components/common/DateController";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { setLoading } from "../redux/slices/appStateSlice";
import PageLoader from "../components/common/PageLoader";
import CustomSnackBar from "../components/common/Snackbar";

const LoadPostingPage = () => {
  const navigate = useNavigate();
  const [loadPosting] = useLoadPostingMutation();
  const [selectedShipmentType, setSelectedShipmentType] = useState("");
  const [selectedShipmentWeightUnits, setSelectedShipmentWeightUnits] =
    useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<AlertColor>("success");
  const { userId, loading } = useSelector((state: RootState) => state.appState);
  const dispatch = useDispatch();

  const defaultValues: ILoadPosting = {
    origin: "",
    destination: "",
    shipmentType: "",
    shipmentWeight: "",
    pickUpDate: new Date(),
    deliveryDate: new Date(),
    addDetails: "",
  };
  const method = useForm<ILoadPosting>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(loadPostingSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;

  const convertWeightToKg = (shipmentWeight: string) => {
    if (selectedShipmentWeightUnits === "Tonnes") {
      return (parseInt(shipmentWeight, 10) * 1000).toString();
    } else if (selectedShipmentWeightUnits === "ft\u00B3") {
      return (parseInt(shipmentWeight, 10) * 28).toString();
    } else if (selectedShipmentWeightUnits === "m\u00B3") {
      return (parseInt(shipmentWeight, 10) * 333).toString();
    } else {
      return shipmentWeight;
    }
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

  const formSubmit: SubmitHandler<ILoadPosting> = async (
    data: ILoadPosting
  ) => {
    dispatch(setLoading(true));
    try {
      data.shipmentWeight = convertWeightToKg(data.shipmentWeight);
      const { msg } = await loadPosting({ userId, data }).unwrap();
      if (msg === APIResult.loadPostingSuccess) {
        setSnackOpen(true);
        setText("Load Posting Done Successfully!");
        setStatus("success");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error while load posting:", error);
      setSnackOpen(true);
      setText("Error while load posting. Please try again.");
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
            Shipment Details
          </Typography>
          <FormProvider {...method}>
            <form onSubmit={handleSubmit(formSubmit)}>
              <Stack spacing={10} alignItems={"center"}>
                <Grid
                  container
                  gridTemplateColumns={"50% 50%"}
                  justifyContent={"space-between"}
                >
                  <Stack spacing={6} minWidth={"45%"}>
                    <TextField
                      label="Origin"
                      variant="standard"
                      InputProps={{
                        style: {
                          borderRadius: "10px",
                        },
                      }}
                      id="origin"
                      required
                      helperText={errors.origin?.message}
                      {...register("origin", { required: true })}
                      sx={{ height: 50 }}
                    />
                    <FormControl variant="standard">
                      <InputLabel id="shipmentType" required>
                        Shipment Type
                      </InputLabel>
                      <Select
                        labelId="shipmentType"
                        label="Shipment Type"
                        variant="standard"
                        id="shipmentType"
                        value={selectedShipmentType}
                        {...register("shipmentType")}
                        onChange={(e) =>
                          setSelectedShipmentType(e.target.value)
                        }
                        style={{ borderRadius: "10px" }}
                      >
                        {shipment_type.map((c) => (
                          <MenuItem key={c.key} value={c.key}>
                            {c.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <DateTimeController
                      value={dayjs(defaultValues.pickUpDate)}
                      name="pickUpDate"
                      label="Preferred Pickup Date/Time"
                    />
                    <TextField
                      multiline
                      rows={5}
                      label="Additional Details"
                      variant="standard"
                      InputProps={{
                        style: {
                          borderRadius: "10px",
                          backgroundColor: myColors.backgroundGrey,
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      id="addDetails"
                      helperText={errors.addDetails?.message}
                      {...register("addDetails", { required: true })}
                    />
                  </Stack>
                  <Stack spacing={6} minWidth={"45%"}>
                    <TextField
                      label="Destination"
                      variant="standard"
                      InputProps={{
                        style: {
                          borderRadius: "10px",
                        },
                      }}
                      id="destination"
                      required
                      helperText={errors.destination?.message}
                      {...register("destination", { required: true })}
                      sx={{ height: 50 }}
                    />
                    <Stack
                      direction={"row"}
                      spacing={6}
                      justifyContent={"space-between"}
                    >
                      <TextField
                        fullWidth
                        label="Shipment Weight or Volume"
                        variant="standard"
                        id="shipmentWeight"
                        InputProps={{
                          style: {
                            borderRadius: "10px",
                          },
                        }}
                        required
                        helperText={errors.shipmentWeight?.message}
                        {...register("shipmentWeight", { required: true })}
                        sx={{ height: 50 }}
                      />
                    </Stack>
                    <DateTimeController
                      value={dayjs(defaultValues.deliveryDate)}
                      name="deliveryDate"
                      label="Preferred Delivery Date/Time"
                    />
                  </Stack>
                </Grid>
                <div style={{ width: "150px" }}>
                  <Button variant="contained" fullWidth type="submit">
                    Proceed
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

export default LoadPostingPage;

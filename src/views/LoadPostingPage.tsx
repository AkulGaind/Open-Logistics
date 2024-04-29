import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
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
import {
  APIResult,
  shipment_type,
  shipment_weight_units,
} from "../utility/constants";
import loadPostingSchema from "../validationSchemas/loadPostingSchema";
import DateTimeController from "../components/common/DateController";
import { useState } from "react";

const LoadPostingPage = () => {
  const navigate = useNavigate();
  const [loadPosting] = useLoadPostingMutation();
  const [selectedShipmentType, setSelectedShipmentType] = useState("");
  const [selectedShipmentWeightUnits, setSelectedShipmentWeightUnits] =
    useState("");

  const defaultValues: ILoadPosting = {
    origin: "",
    destination: "",
    shipmentType: "",
    shipmentWeight: "",
    shipmentUnits: "",
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

  const formSubmit: SubmitHandler<ILoadPosting> = async (
    data: ILoadPosting
  ) => {
    console.log(data);
    const { msg } = await loadPosting(data).unwrap();
    if (msg === APIResult.loadPostingSuccess) {
      navigate("/dashboard");
    }
  };

  return (
    <Container style={{ padding: "5%" }}>
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
                    onChange={(e) => setSelectedShipmentType(e.target.value)}
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
                  />
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="shipmentWeight" required>
                      Shipment Units
                    </InputLabel>
                    <Select
                      labelId="shipmentUnits"
                      label="Shipment Units"
                      variant="standard"
                      id="shipmentUnits"
                      value={selectedShipmentWeightUnits}
                      onChange={(e) =>
                        setSelectedShipmentWeightUnits(e.target.value)
                      }
                      style={{
                        borderRadius: "10px",
                      }}
                    >
                      {shipment_weight_units.map((c) => (
                        <MenuItem key={c.key} value={c.key}>
                          {c.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
    </Container>
  );
};

export default LoadPostingPage;

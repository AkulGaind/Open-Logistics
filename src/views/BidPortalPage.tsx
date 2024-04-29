import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import myColors from "../themes/colors";
import { IBidPortal } from "../interfaces/interfaces";
import bidPortalSchema from "../validationSchemas/bidPortalSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useBidPortalMutation } from "../redux/slices/serviceSlice";
import { APIResult } from "../utility/constants";

const BidPortalPage = () => {
  const navigate = useNavigate();
  const [bidPortal] = useBidPortalMutation();

  const defaultValues: IBidPortal = {
    bidAmount: "",
  };
  const method = useForm<IBidPortal>({
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

  const formSubmit: SubmitHandler<IBidPortal> = async (data: IBidPortal) => {
    console.log(data);
    const { msg } = await bidPortal(data).unwrap();
    if (msg === APIResult.bidPortalSuccess) {
      navigate("/dashboard");
    }
  };

  return (
    <Container style={{ padding: "5%" }}>
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
                  value={"xxxxxxxxxx"}
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
                  value={"xxxxxxxxxx"}
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
                  value={"xxxxxxxxxx"}
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
                  value={"xxxxxxxxxx"}
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
                  value={"xxxxxxxxxx"}
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
                  value={"xxxxxxxxxx"}
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
                      value={"xxxxxxxxxx"}
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
                      value={"xxxxxxxxxx"}
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
                  value={"xxxxxxxxxx"}
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
                  value={"xxxxxxxxxx"}
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
    </Container>
  );
};

export default BidPortalPage;

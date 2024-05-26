import { date, object, string } from "yup";

const required = "*This field is required";
// const valid = "Please enter a valid phone number";

const bidPortalSchema = object().shape({
  // shipperName: string()
  //   .required(required)
  //   .min(6, "Username must be at least 6 characters")
  //   .max(20, "Username cannot be more than 20 characters"),
  // shipperEmail: string()
  //   .required(required)
  //   .email("*Please enter valid email address"),
  // shipperPhone: string()
  //   .required(required)
  //   .length(10, valid)
  //   .matches(/^[6-9]{1}?[0-9]{9}$/, valid),
  // shipperAddress: string()
  //   .required(required)
  //   .max(20, "Company cannot be more than 20 characters"),
  // origin: string().required(required),
  // destination: string().required(required),
  // shipmentType: string().required(required),
  // shipmentWeightVolume: string()
  //   .matches(/^\d+$/, "Shipment weight must be a number")
  //   .required(required),
  // pickupDateTime: date().required(required),
  // deliveryDateTime: date().required(required),
  // addDetails: string().max(2500, "Characters Limit Reached").required(),
  bidAmount: string()
    .matches(/^\d+$/, "Bid amount must be a number")
    .required(required),
});
export default bidPortalSchema;

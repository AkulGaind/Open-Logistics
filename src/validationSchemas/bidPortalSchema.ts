import { object, string } from "yup";

const required = "*This field is required";

const bidPortalSchema = object().shape({
  bidAmount: string()
    .matches(/^[1-9]\d*$/, "Bid amount must be a number and cannot be zero")
    .required(required),
});
export default bidPortalSchema;

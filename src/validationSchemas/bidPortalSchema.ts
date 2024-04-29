import { object, string } from "yup";

const required = "*This field is required";

const bidPortalSchema = object().shape({
  bidAmount: string()
    .matches(/^\d+$/, "Bid amount must be a number")
    .required(required),
});
export default bidPortalSchema;

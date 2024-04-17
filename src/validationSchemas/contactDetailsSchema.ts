import { object, string } from "yup";

const required = "*This field is required";

const contactDetailsSchema = object()
  .shape({
    name: string().required(required),
    email: string()
      .required(required)
      .email("*Please enter valid email address"),
    message: string().required(required).max(2500, "Character limit reached"),
  })
  .required();

export default contactDetailsSchema;

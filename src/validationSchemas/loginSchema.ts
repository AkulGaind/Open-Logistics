import { object, string } from "yup";

const loginSchema = object()
  .shape({
    email: string()
      .required("*This field is required")
      .email("*Please enter valid email address"),
    password: string()
      .required("*This is required field")
      .min(8, "*Password must be at least 8 characters")
      .max(32, "*Password can not be more than 32 characters"),
  })
  .required();

export default loginSchema;

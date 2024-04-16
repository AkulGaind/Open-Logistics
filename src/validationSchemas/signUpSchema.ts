import { object, string } from "yup";

const required = "*This field is required";
const valid = "Please enter a valid phone number";

const signUpSchema = object()
  .shape({
    username: string()
      .required(required)
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username cannot be more than 20 characters"),
    email: string()
      .required(required)
      .email("*Please enter valid email address"),
    password: string()
      .required(required)
      .min(8, "*Password must be at least 8 characters")
      .max(32, "*Password can not be more than 32 characters"),
    phone: string()
      .required(required)
      .length(10, valid)
      .matches(/^[6-9]{1}?[0-9]{9}$/, valid),
    company: string()
      .required(required)
      .max(20, "Company cannot be more than 20 characters"),
    role: string().required(required),
  })
  .required();

export default signUpSchema;

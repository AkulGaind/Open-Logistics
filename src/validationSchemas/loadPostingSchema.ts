import { date, object, string } from "yup";

const required = "*This field is required";

const loadPostingSchema = object().shape({
  origin: string().required(required),
  destination: string().required(required),
  shipmentType: string().required(required),
  shipmentWeight: string().required(required),
  shipmentUnits: string().required(required),
  pickUpDate: date().required(required),
  deliveryDate: date()
    .when("pickUpDate", (pickUpDate, schema) => {
      return schema.min(
        pickUpDate,
        "Delivery date should be greater than pickup date"
      );
    })
    .required(required),
  addDetails: string().max(2500, "Characters Limit Reached").required(),
});
export default loadPostingSchema;

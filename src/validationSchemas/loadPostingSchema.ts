import { date, object, string } from "yup";

const required = "*This field is required";

const loadPostingSchema = object().shape({
  origin: string().required(required),
  destination: string().required(required),
  shipmentType: string().required(required),
  shipmentWeightVolume: string()
    .matches(/^\d+$/, "Shipment weight must be a number")
    .required(required),
  pickupDateTime: date().required(required),
  deliveryDateTime: date()
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

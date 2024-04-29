import { IShipperDashboardColumn } from "../interfaces/interfaces";

export enum APIResult {
  loginSuccess = "Login Successful",
  signUpSuccess = "User registered successfully",
  contactUsSuccess = "Message sent successfully",
  loadPostingSuccess = "Load Posting done successfully",
  bidPortalSuccess = "Bid placed successfully",
}

export const shipment_type: readonly {
  key: string;
  value: string;
}[] = [
  {
    key: "FTL",
    value: "Full Truckload (FTL)",
  },
  {
    key: "LTL",
    value: "Less Than Truckload (LTL)",
  },
];

export const shipment_weight_units: readonly {
  key: string;
  value: string;
}[] = [
  {
    key: "Kg",
    value: "Kilograms (Kg)",
  },
  {
    key: "Tonnes",
    value: "Metrics Tons (Tonnes)",
  },
  {
    key: "ft\u00B3",
    value: "Cubic Feet (ft\u00B3)",
  },
  {
    key: "m\u00B3",
    value: "Cubic Meters (m\u00B3)",
  },
];

export const shipper_columns: readonly IShipperDashboardColumn[] = [
  {
    id: "shipperName",
    label: "Shipper Name",
    width: "25%",
  },
  {
    id: "email",
    label: "Email",
    width: "8%",
  },
  {
    id: "phone",
    label: "Phone",
    width: "10%",
  },
  {
    id: "address",
    label: "Address",
    width: "10%",
  },
  {
    id: "origin",
    label: "Shipment Origin",
    width: "10%",
  },
  {
    id: "destination",
    label: "Shipment Destination",
    width: "10%",
  },
  {
    id: "shipmentType",
    label: "Shipment Type",
    width: "10%",
  },
  {
    id: "shipmentWeight",
    label: "Shipment Weight or Volume",
    width: "10%",
  },
  {
    id: "shipmentUnits",
    label: "Shipment Units",
    width: "10%",
  },
  {
    id: "pickUpDate",
    label: "Pickup Date/Time",
    width: "10%",
  },
  {
    id: "deliveryDate",
    label: "Delivery Date/Time",
    width: "10%",
  },
  {
    id: "bidAmount",
    label: "Bid Amount",
    width: "10%",
  },
];

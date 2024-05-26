import {
  ICarrierDashboardColumn,
  IShipperDashboardColumn,
} from "../interfaces/interfaces";

export enum APIResult {
  loginSuccess = "Login Successful",
  signUpSuccess = "User registered successfully",
  contactUsSuccess = "Message sent successfully",
  loadPostingSuccess = "Shipment details added successfully",
  bidPortalSuccess = "carrierBidData updated successfully",
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
    id: "invoice",
    label: "Invoice No.",
  },
  {
    id: "carrierName",
    label: "Carrier Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "phone",
    label: "Phone",
  },
  {
    id: "address",
    label: "Address",
  },
  {
    id: "origin",
    label: "Shipment Origin",
  },
  {
    id: "destination",
    label: "Shipment Destination",
  },
  {
    id: "shipmentType",
    label: "Shipment Type",
  },
  {
    id: "shipmentWeight",
    label: "Shipment Weight or Volume",
  },
  {
    id: "pickUpDate",
    label: "Pickup Date/Time",
  },
  {
    id: "deliveryDate",
    label: "Delivery Date/Time",
  },
  {
    id: "bidAmount",
    label: "Bid Amount",
  },
];

export const carrier_columns: readonly ICarrierDashboardColumn[] = [
  {
    id: "invoice",
    label: "Invoice No.",
  },
  {
    id: "shipperName",
    label: "Shipper Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "phone",
    label: "Phone",
  },
  {
    id: "address",
    label: "Address",
  },
  {
    id: "origin",
    label: "Shipment Origin",
  },
  {
    id: "destination",
    label: "Shipment Destination",
  },
  {
    id: "shipmentType",
    label: "Shipment Type",
  },
  {
    id: "shipmentWeight",
    label: "Shipment Weight or Volume",
  },
  {
    id: "pickUpDate",
    label: "Pickup Date/Time",
  },
  {
    id: "deliveryDate",
    label: "Delivery Date/Time",
  },
  {
    id: "bidAmount",
    label: "Bid Amount",
  },
];

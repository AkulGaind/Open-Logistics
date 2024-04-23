export enum APIResult {
  loginSuccess = "Login Successful",
  signUpSuccess = "User registered successfully",
  contactUsSuccess = "Message sent successfully",
  loadPostingSuccess = "Load Posting done successfully",
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

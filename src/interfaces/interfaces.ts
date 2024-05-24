export interface AppState {
  loggedIn: boolean;
  appRole: "Admin" | "Shipper" | "Carrier" | string;
  userId: string;
  loading: boolean;
}

export interface StyledCardProps {
  title: string;
  buttonText: string;
}

export interface LabelControllerProps {
  label: string;
  placeholder: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignUp extends ILogin {
  username: string;
  phone: string;
  company: string;
  role: "Admin" | "Shipper" | "Carrier" | string;
}

export interface IResponse {
  msg: string;
  token: string;
  userId: string;
  role?: string;
}

export interface IContactDetails {
  username: string;
  email: string;
  message: string;
}

export interface ILoadPosting {
  origin: string;
  destination: string;
  shipmentType: string;
  shipmentWeight: string;
  pickUpDate: Date;
  deliveryDate: Date;
  addDetails: string;
}

export interface IBidPortal {
  bidAmount: string;
}

export interface IShipperDashboard
  extends IBidPortal,
    Omit<ILoadPosting, "addDetails"> {
  invoice: string;
  carrierName: string;
  email: string;
  phone: string;
  address: string;
}

export interface IShipperDashboardColumn {
  id:
    | "invoice"
    | "carrierName"
    | "email"
    | "phone"
    | "address"
    | "origin"
    | "destination"
    | "shipmentType"
    | "shipmentWeight"
    | "pickUpDate"
    | "deliveryDate"
    | "bidAmount";
  label: string;
}

export interface ICarrierDashboard
  extends IBidPortal,
    Omit<ILoadPosting, "addDetails"> {
  invoice: string;
  shipperName: string;
  email: string;
  phone: string;
  address: string;
}

export interface ICarrierDashboardColumn {
  id:
    | "invoice"
    | "shipperName"
    | "email"
    | "phone"
    | "address"
    | "origin"
    | "destination"
    | "shipmentType"
    | "shipmentWeight"
    | "pickUpDate"
    | "deliveryDate"
    | "bidAmount";
  label: string;
}

export interface AppState {
  loggedIn: boolean;
  appRole: string;
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
  address: string;
  role: string;
}

export interface IResponse<T = any> {
  msg: string;
  userId?: string;
  roles?: string;
  data?: T[];
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
  shipmentWeightVolume: string;
  pickupDateTime: Date;
  deliveryDateTime: Date;
  addDetails: string;
}

export interface IBidPortal extends ILoadPosting {
  shipperName: string;
  shipperEmail: string;
  shipperPhone: string;
  shipperAddress: string;
  bidAmount: string;
}

export interface IShipperDashboard
  extends Omit<ILoadPosting, "addDetails">,
    Pick<IBidPortal, "bidAmount"> {
  _id: string;
  carrierName: string;
  carrierEmail: string;
  carrierPhone: string;
  carrierAddress: string;
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
  _id: string;
  shipperName: string;
  email: string;
  phone: string;
  address: string;
  addDetails: string;
  shipperId: string;
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

export interface IPayment {
  shipperName: string;
  shipmentType: string;
  shipmentWeightVolume: string;
  pickupDateTime: Date;
  deliveryDateTime: Date;
  bidAmount: string;
}

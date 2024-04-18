export interface AppState {
  loggedIn: boolean;
  appRole: "Admin" | "Shipper" | "Carrier" | string;
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
  name: string;
  email: string;
  message: string;
}

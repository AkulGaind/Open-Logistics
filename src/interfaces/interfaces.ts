export interface AppState {
    loggedIn: boolean;
    appRole: ILogin['role'];
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
    role: "Admin" | "Shipper" | "Carrier" | string;
}

export interface ISignUp extends ILogin {
    username: string;
    phone: string;
    company: string;
}
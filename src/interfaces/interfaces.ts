export interface AppState {
    loggedIn: boolean;
    role: ILogin['role'];
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
    role: "Admin" | "Shipper" | "Carrier";
}

export interface ISignUp extends ILogin {
    name: string;
    phone: number;
    company: string;
}
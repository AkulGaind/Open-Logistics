import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, ILogin } from "../../interfaces/interfaces";

const initialState: AppState = {
    loggedIn: false,
    role: "Admin",
};

const appStateSlice = createSlice({
    name: "appState",
    initialState: initialState,
    reducers: {
        reset: () => initialState,
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        setRole: (state, action: PayloadAction<ILogin['role']>) => {
            state.role = action.payload;
        },
    },
});

export const {
    reset,
    setLoggedIn,
    setRole,
} = appStateSlice.actions;

export default appStateSlice;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, ILogin } from "../../interfaces/interfaces";

const initialState: AppState = {
    loggedIn: false,
    appRole: "",
};

const appStateSlice = createSlice({
    name: "appState",
    initialState: initialState,
    reducers: {
        reset: () => initialState,
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        setAppRole: (state, action: PayloadAction<ILogin['role']>) => {
            state.appRole = action.payload;
        },
    },
});

export const {
    reset,
    setLoggedIn,
    setAppRole,
} = appStateSlice.actions;

export default appStateSlice;
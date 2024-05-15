import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, ISignUp } from "../../interfaces/interfaces";

const initialState: AppState = {
    loggedIn: false,
    appRole: "",
    userId: "",
};

const appStateSlice = createSlice({
    name: "appState",
    initialState: initialState,
    reducers: {
        reset: () => initialState,
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        setAppRole: (state, action: PayloadAction<ISignUp['role']>) => {
            state.appRole = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
    },
});

export const {
    reset,
    setLoggedIn,
    setAppRole,
    setUserId,
} = appStateSlice.actions;

export default appStateSlice;
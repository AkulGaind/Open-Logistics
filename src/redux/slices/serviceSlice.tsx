import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IBidPortal,
  IContactDetails,
  ILoadPosting,
  ILogin,
  IResponse,
  ISignUp,
} from "../../interfaces/interfaces";

const backendUrl = "http://localhost:3000/api/";
if (!backendUrl) {
  throw new Error("You need to provide REACT_APP_BACKEND_URL env variable");
}

const customFetchFn = async (input: RequestInfo, init?: RequestInit) => {
  return fetch(input, init);
};

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl, fetchFn: customFetchFn }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<IResponse, ILogin>({
      query: ({ email, password }) => {
        const reqData = {
          email: email,
          password: password,
        };
        return {
          url: `auth/login`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: reqData,
        };
      },
    }),
    signUpUser: builder.mutation<IResponse, ISignUp>({
      query: ({ username, email, phone, password, company, role }) => {
        const reqData = {
          username: username,
          email: email,
          phone: phone,
          password: password,
          companyName: company,
          roles: role,
        };

        return {
          url: `auth/register`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: reqData,
        };
      },
    }),
    contactUs: builder.mutation<Pick<IResponse, "msg">, IContactDetails>({
      query: ({ username, email, message }) => {
        const reqData = {
          username: username,
          email: email,
          message: message,
        };

        return {
          url: `form/contact`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: reqData,
        };
      },
    }),
    loadPosting: builder.mutation<Pick<IResponse, "msg">, ILoadPosting>({
      query: ({
        origin,
        destination,
        shipmentType,
        shipmentWeight,
        shipmentUnits,
        pickUpDate,
        deliveryDate,
        addDetails,
      }) => {
        const reqData = {
          origin: origin,
          destination: destination,
          shipmentType: shipmentType,
          shipmentWeight: shipmentWeight,
          shipmentUnits: shipmentUnits,
          pickUpDate: pickUpDate,
          deliveryDate: deliveryDate,
          addDetails: addDetails,
        };

        return {
          url: `form/loadPosting`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: reqData,
        };
      },
    }),
    bidPortal: builder.mutation<Pick<IResponse, "msg">, IBidPortal>({
      query: ({ bidAmount }) => {
        const reqData = {
          bidAmount: bidAmount,
        };

        return {
          url: `form/bidPortal`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: reqData,
        };
      },
    }),
    shipperDetails: builder.mutation<any, {userId: string}>({
      query: ({ userId }) => {
        const reqData = {
          userId: userId,
        };

        return {
          url: `auth/shipper`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: reqData,
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignUpUserMutation,
  useContactUsMutation,
  useLoadPostingMutation,
  useBidPortalMutation,
  useShipperDetailsMutation,
} = appApi;

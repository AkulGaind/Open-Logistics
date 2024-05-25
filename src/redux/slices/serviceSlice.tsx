import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IBidPortal,
  ICarrierDashboard,
  IContactDetails,
  ILoadPosting,
  ILogin,
  IResponse,
  IShipperDashboard,
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
          credentials: "include",
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
          address: company,
          roles: role,
        };

        return {
          url: `auth/register`,
          method: "POST",
          credentials: "include",
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
    loadPosting: builder.mutation<
      Pick<IResponse, "msg">,
      { userId: string; data: ILoadPosting }
    >({
      query: ({ userId, data }) => {
        const {
          origin,
          destination,
          shipmentType,
          shipmentWeight,
          pickUpDate,
          deliveryDate,
          addDetails,
        } = data;
        const reqData = {
          shipperId: userId,
          origin: origin,
          destination: destination,
          shipmentType: shipmentType,
          shipmentWeightVolume: shipmentWeight,
          pickupDateTime: pickUpDate,
          deliveryDateTime: deliveryDate,
          addDetails: addDetails,
        };

        return {
          url: `shipment/loadPosting`,
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: reqData,
        };
      },
    }),
    bidPortal: builder.mutation<
      Pick<IResponse, "msg">,
      { userId: string; data: IBidPortal }
    >({
      query: ({ userId, data }) => {
        const {
          shipperName,
          shipperEmail,
          shipperPhone,
          shipperAddress,
          bidAmount,
          origin,
          destination,
          shipmentType,
          shipmentWeight,
          pickUpDate,
          deliveryDate,
          addDetails,
        } = data;
        const reqData = {
          userId: userId,
          shipperName,
          shipperEmail,
          shipperPhone,
          shipperAddress,
          origin,
          destination,
          shipmentType,
          shipmentWeight,
          pickUpDate,
          deliveryDate,
          addDetails,
          bidAmount: bidAmount,
        };

        return {
          url: `shipment/bidPortal`,
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: reqData,
        };
      },
    }),
    shipperDetails: builder.query<IResponse<ICarrierDashboard>, string>({
      query: () => ({
        url: "/shipment/dashboard",
        credentials: "include",
        method: "GET",
      }),
    }),
    carrierDetails: builder.query<IResponse<IShipperDashboard>, string>({
      query: () => ({
        url: `/shipment/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignUpUserMutation,
  useContactUsMutation,
  useLoadPostingMutation,
  useBidPortalMutation,
  useLazyCarrierDetailsQuery,
  useLazyShipperDetailsQuery,
} = appApi;

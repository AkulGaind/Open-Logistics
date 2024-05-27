import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IBidPortal,
  ICarrierDashboard,
  IContactDetails,
  ILoadPosting,
  ILogin,
  IPayment,
  IResponse,
  IShipperDashboard,
  ISignUp,
} from "../../interfaces/interfaces";
import { getJwtValue } from "../../utility/utils";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
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
      query: ({ username, email, phone, password, address, role }) => {
        const reqData = {
          username: username,
          email: email,
          phone: phone,
          password: password,
          address: address,
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
          shipmentWeightVolume,
          pickupDateTime,
          deliveryDateTime,
          addDetails,
        } = data;
        const reqData = {
          shipperId: userId,
          origin: origin,
          destination: destination,
          shipmentType: shipmentType,
          shipmentWeightVolume: shipmentWeightVolume,
          pickupDateTime: pickupDateTime,
          deliveryDateTime: deliveryDateTime,
          addDetails: addDetails,
        };
        const headers = {
          Authorization: `Bearer ${getJwtValue()}`,
          "Content-Type": "application/json",
        };

        return {
          url: `shipment/loadPosting`,
          method: "POST",
          credentials: "include",
          headers: headers,
          body: reqData,
        };
      },
    }),
    bidPortal: builder.mutation<
      Pick<IResponse, "msg">,
      { userId: string; biddingDetails: IBidPortal; shipperId: string }
    >({
      query: ({ userId, biddingDetails, shipperId }) => {
        const {
          shipperName,
          shipperEmail,
          shipperPhone,
          shipperAddress,
          bidAmount,
          origin,
          destination,
          shipmentType,
          shipmentWeightVolume,
          pickupDateTime,
          deliveryDateTime,
          addDetails,
        } = biddingDetails;
        const reqData = {
          userId,
          shipperId,
          shipperName,
          shipperEmail,
          shipperPhone,
          shipperAddress,
          origin,
          destination,
          shipmentType,
          shipmentWeightVolume,
          pickupDateTime,
          deliveryDateTime,
          addDetails,
          bidAmount: bidAmount,
        };
        const headers = {
          Authorization: `Bearer ${getJwtValue()}`,
          "Content-Type": "application/json",
        };

        return {
          url: `shipment/bidPortal`,
          method: "POST",
          credentials: "include",
          headers: headers,
          body: reqData,
        };
      },
    }),
    shipperDetails: builder.query<IResponse<ICarrierDashboard>, string>({
      query: () => {
        const headers = {
          Authorization: `Bearer ${getJwtValue()}`,
          "Content-Type": "application/json",
        };
        return {
          url: "/shipment/dashboard",
          method: "GET",
          credentials: "include",
          headers: headers,
        };
      },
    }),
    carrierDetails: builder.query<IResponse<IShipperDashboard>, string>({
      query: () => {
        const headers = {
          Authorization: `Bearer ${getJwtValue()}`,
          "Content-Type": "application/json",
        };
        return {
          url: "/shipment/dashboard",
          method: "GET",
          credentials: "include",
          headers: headers,
        };
      },
    }),
    invoice: builder.mutation({
      query: () => {
        const headers = {
          Authorization: `Bearer ${getJwtValue()}`,
          "Content-Type": "application/json",
        };
        return {
          url: `shipment/download`,
          method: "POST",
          credentials: "include",
          headers: headers,
        };
      },
    }),
    paymentId: builder.mutation<{ sessionId: string }, IPayment>({
      query: ({
        shipperName,
        shipmentWeightVolume,
        shipmentType,
        pickupDateTime,
        deliveryDateTime,
        bidAmount,
      }) => {
        const reqData = {
          shipperName,
          shipmentWeightVolume,
          shipmentType,
          pickupDateTime,
          deliveryDateTime,
          bidAmount,
        };
        const headers = {
          Authorization: `Bearer ${getJwtValue()}`,
          "Content-Type": "application/json",
        };
        return {
          url: `shipment/payment`,
          method: "POST",
          credentials: "include",
          headers: headers,
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
  useLazyCarrierDetailsQuery,
  useLazyShipperDetailsQuery,
  useInvoiceMutation,
  usePaymentIdMutation,
} = appApi;

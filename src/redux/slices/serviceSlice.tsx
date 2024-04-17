import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogin, IResponse, ISignUp } from "../../interfaces/interfaces";

const backendUrl = "http://localhost:3000/api/auth";
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
          url: `/login`,
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
          role: role,
        };

        return {
          url: `/register`,
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
} = appApi;
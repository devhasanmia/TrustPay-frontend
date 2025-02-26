import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.trustPayApiUrl, 
    prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState)?.auth?.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
  }}),
  endpoints: () => ({}),
});



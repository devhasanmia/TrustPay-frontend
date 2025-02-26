import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.query({
      query: () => ({
        url: "/user/getAdmin",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdminQuery } = authApi;
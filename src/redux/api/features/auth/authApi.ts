import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: "/auth/registration",
        method: "POST",
        body: data,
      }),
    })
  }),
});

export const { useRegistrationMutation} = authApi;

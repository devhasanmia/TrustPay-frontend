import { baseApi } from "../../baseApi";

const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation({
      query: (data) => ({
        url: "/transactions/sendMoney",
        method: "POST",
        body: data,
      }),
    })
  })
});

export const {useSendMoneyMutation } = transactionsApi;

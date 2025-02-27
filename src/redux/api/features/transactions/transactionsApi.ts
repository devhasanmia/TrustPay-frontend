import { baseApi } from "../../baseApi";

const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation({
      query: (data) => ({
        url: "/transactions/sendMoney",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transactions"],
    }),
    cashOut: builder.mutation({
      query: (data) => ({
        url: "/transactions/cashOut",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transactions"], 
    }),
    getTransactions: builder.query({
      query: () => ({
        url: "transactions/getTransactions",
        method: "GET",
      }),
      providesTags: ["transactions"], 
    }),
    getAllTransactions: builder.query({
      query: () => ({
        url: "transactions/getAllTransactions",
        method: "GET",
      }),
      providesTags: ["transactions"], 
    }),
    cashIn: builder.mutation({
      query: (data) => ({
        url: "transactions/cashIn",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["transactions", "user"], 
    }),
  }),
});

export const {
  useSendMoneyMutation,
  useCashOutMutation,
  useGetTransactionsQuery,
  useGetAllTransactionsQuery,
  useCashInMutation
} = transactionsApi;

import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.query({
      query: () => ({
        url: "/user/getAdmin",
        method: "GET",
      }),
    }),
    agentsApprovalRequest: builder.query({
        query: () => ({
          url: "/user/agents-approval-request",
          method: "GET",
        }),
        providesTags: ["transactions", "user"]
      }),
      agentsApproval: builder.mutation({
          query: ({ id, status }) => (
              console.log(id, status),
              {
              url: `/user/agents-approval/${id}`,
              method: "PUT",
              body: status ,
            }),
            invalidatesTags: ["transactions", "user"]
      }),
      getAgents: builder.query({
        query: () => ({
          url: "/user/getAgents",
        method: "GET"
        }),
        providesTags: ["transactions", "user"]
      }),
      getUser: builder.query({
        query: () => ({
          url: "/user/getUser",
          method: "GET"
        }),
        providesTags: ["transactions", "user"]
      }),
      getAgentown: builder.query({
        query: () => ({
          url: "/user/getAgentown",
          method: "GET"
        }),
        providesTags: ["transactions", "user"]
      })
  }),
});

export const { useGetAdminQuery, useAgentsApprovalMutation, useGetAgentsQuery, useAgentsApprovalRequestQuery, useGetUserQuery, useGetAgentownQuery} = authApi;
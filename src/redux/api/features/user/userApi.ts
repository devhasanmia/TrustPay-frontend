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
      }),
      agentsApproval: builder.mutation({
          query: ({ id, status }) => (
              console.log(id, status),
              {
              url: `/user/agents-approval/${id}`,
              method: "PUT",
              body: status ,
            }),
      }),
      getAgents: builder.query({
        query: () => ({
          url: "/user/getAgents",
        method: "GET"
        })
      }),
      getUser: builder.query({
        query: () => ({
          url: "/user/getUser",
          method: "GET"
        })
      })
  }),
});

export const { useGetAdminQuery, useAgentsApprovalMutation, useGetAgentsQuery, useAgentsApprovalRequestQuery, useGetUserQuery} = authApi;
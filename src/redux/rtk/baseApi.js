import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
    reducerPath: 'myApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SERVER,
        prepareHeaders: (headers, { getState }) => {
          const user = getState().auth.user;
          if (user && user.accessToken) {
              headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
          return headers;      
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
              url: "/auth/login",
              method: "post",
              body: userInfo,
            }),
          }),
        getProducts: builder.query({
            query: () => "/products",
            keepUnusedDataFor:0.0001,
          }),
    })
})

export const {
  useGetProductsQuery, useLoginMutation
} = baseApi;

export default baseApi
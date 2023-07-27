import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ["UserDetails"],
  endpoints: (build) => ({
    getAllComments: build.query({
      query: (id) => `/gallery/comments/${id}`,
      providesTags: ["getAllComments"],
    }),
  }),
});

// export react hook
export const { useGetAllCommentsQuery } = authApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: [
    'User',
    'Laser',
    'Custumer',
    'CustumerVisitMesurement',
  ],
  baseQuery: fetchBaseQuery({
    mode: 'cors',
    baseUrl: 'http://localhost:3005',
    // prepareHeaders: (headers, { getState }) => {
    //   const state = getState();
    //   const { token } = state.userAuthentication;

    //   headers.set('Authorization', `Bearer ${token}`);

    //   headers.set('Content-Type', 'application/json');

    //   return headers;
    // },
  }),
  endpoints: (build) => ({
    readUser: build.query({ query: () => '' }),
  }),
});

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: [
    'User',
    'Laser',
    'Custumer',
    'CustumerVisitMesurement',
    'pecas',
  ],
  baseQuery: fetchBaseQuery({
    mode: 'cors',
    baseUrl: process.env.REACT_APP_API_URL, 
  }),
  endpoints: (build) => ({
    readUser: build.query({ query: () => '' }),
  }),
});

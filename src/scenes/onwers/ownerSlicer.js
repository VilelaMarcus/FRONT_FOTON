import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../redux/api/api-slice';

export const initialState = { list: [] };
const slice = 'owners';

export const {
  endpoints,
  useCreateCustomerMutation,
  useReadAllOwnersQuery,
  useGetLasersByCostumerIdQuery,
  useReadAwardsQuery,
} = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCustomer: build.mutation({
      query: (body) => {
        return {
          url: `/customer/`,
          method: 'POST',
          body,
        };
      },
    }),
    readAllOwners: build.query({
      query: (id) => `/customer/`,
      providesTags: ['customers'],
    }),  
    getLasersByCostumerId: build.query({
      query: (id) => `/laserOfCustomer/${id}`,
      providesTags: ['customers'],
    }),
  }),
  overrideExisting: false,
})


export const { reducer, actions } = createSlice({
  name: slice,
  initialState,
  reducers: {
    addCostumer: (state, { payload }) => {
      state.list.push(payload);
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      endpoints.readAllOwners.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
    }
    );
    builder.addMatcher(
      endpoints.createCustomer.matchFulfilled,
      (state, { payload }) => {
        console.log({payload});
        state.list.push(payload);
    }
    );
  },
});

export { slice };

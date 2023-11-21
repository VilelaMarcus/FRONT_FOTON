import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../redux/api/api-slice';

export const initialState = { 
  list: [],
  currentEquipments: []
};
const slice = 'owners';

export const {
  endpoints,
  useCreateCustomerMutation,
  useAddEquipmentToCustomerMutation,
  useReadAllOwnersQuery,
  useGetLasersByCostumerIdQuery,
  useDeleteEquipmentMutation,
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
    deleteEquipment: build.mutation({
      query: (id) => {
        return {
          url: `/laserOfCustomer/${id}`,
          method: 'DELETE',
        };
      },
    }),
    addEquipmentToCustomer: build.mutation({
      query: (body) => {
        return {
          url: `/laserOfCustomer/`,
          method: 'POST',
          body,
        };
      },
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
    updateListEquipments: (state, { payload }) => {
      state.currentEquipments.push(payload);
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
        state.list.push(payload);
    }
    );
    builder.addMatcher(
      endpoints.getLasersByCostumerId.matchFulfilled,
      (state, { payload }) => {
        state.currentEquipments.push(payload);
    }
    );
  },
});

export { slice };

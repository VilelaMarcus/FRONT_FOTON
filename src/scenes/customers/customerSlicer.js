import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../redux/api/api-slice';

export const initialState = { list: [], };
const slice = 'customers';

export const {
  endpoints,
  useCreateCustomerMutation,
  useReadCustomerByLaserIdQuery,
  useReadCustomerVisitMeasurementByCustomerIdQuery,
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
    readCustomerByLaserId: build.query({
      query: (id) => `/customer/${id}`,
      providesTags: ['customers'],
    }),
    readCustomerVisitMeasurementByCustomerId: build.query({
      query: (id) => `/custumerMeasurement/customerId/${id}`,
      providesTags: ['custmer-visit-measurement'],
    }),    
  }),
  overrideExisting: false,
})


export const { reducer, actions } = createSlice({
  name: slice,
  initialState,
  reducers: {
    addNewDate: (state, { payload }) => {
      state.list.push(payload);
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      endpoints.readCustomerByLaserId.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
    }
    );
  },
});

export { slice };

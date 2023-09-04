import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../redux/api/api-slice';

export const initialState = { list: [], };
const slice = 'customers';

export const {
  endpoints,
  useReadCustomerByLaserIdQuery,
  useReadCustomerVisitMeasurementByCustomerIdQuery,
  useUpdateVisitMeasurementMutation,
  useReadAwardsQuery,
} = apiSlice.injectEndpoints({
  endpoints: (build) => ({
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
  reducers: {},
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

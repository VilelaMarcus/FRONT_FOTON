import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../redux/api/api-slice';
import { Update } from '@mui/icons-material';

export const initialState = { 
  list: [],
  customerVisit : [],	
 };
const slice = 'customers';

export const {
  endpoints,
  useReadCustomerByLaserIdQuery,
  useReadCustomerVisitMeasurementByCustomerIdQuery,
  useReadAwardsQuery,
} = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    readCustomerByLaserId: build.query({
      query: (id) => `/laserOfCustomer/`,
      providesTags: ['laserOfCustomer'],
    }),
    readCustomerVisitMeasurementByCustomerId: build.query({
      query: (id) => `/customerMeasurement/customerId/${id}`,
      providesTags: ['custmer-visit-measurement'],
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
    updateList: (state, { payload }) => {      
      const name = payload.name;
      const keys = Object.keys(payload);
      state.customerVisit = state.customerVisit.map(e => {
        if(e.id === payload.id) {
          const obj = { ...e, [keys[2]]: payload[keys[2]]}         
          return obj;
        }
        else {
          return e;
        }
      })
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      endpoints.readCustomerByLaserId.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
    }
    );
    builder.addMatcher(
      endpoints.readCustomerVisitMeasurementByCustomerId.matchFulfilled,
      (state, { payload }) => {
        state.customerVisit = payload;
    }
    );
  },
});

export { slice };

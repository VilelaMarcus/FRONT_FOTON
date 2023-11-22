import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../../redux/api/api-slice';

export const initialState = { 
  osList:[],
};
const slice = 'os';

export const {
  endpoints,
  useAddNewOsMutation,
  useReadOsByLaserIdQuery,
  useDeleteOsMutation,
  useEditOsMutation,
} = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addNewOs: build.mutation({
      query: (body) => {
        return {
          url: `/os/`,
          method: 'POST',
          body,
        };
      },
    }),
    readOsByLaserId: build.query({
      query: (id) => `/os/${id}`,
      providesTags: ['Laser'],
    }),
    deleteOs: build.mutation({
      query: (id) => {
        return {
          url: `/os/${id}`,
          method: 'DELETE',
        };
      },
    }),    
    editOs: build.mutation({
      query: (body) => {
        return {
          url: `/laserOfCustomer/`,
          method: 'PUT',
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
   
  },
  extraReducers(builder) {
    builder.addMatcher(
      endpoints.readOsByLaserId.matchFulfilled,
      (state, { payload }) => {
        state.osList = payload;
    }
    );
  },
});

export { slice };

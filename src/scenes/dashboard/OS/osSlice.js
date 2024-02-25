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
      query: ({id, body}) => {
        return {
          url: `/os/${id}`,
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
    addOsOnList: (state, { payload }) => {      
      state.osList.unshift(payload);
    }, 
    removeOs: (state, { payload }) => {      
      state.osList = state.osList.filter(os => os.id !== payload);
    },
    updateOsListDescription: (state, { payload }) => {
      const keys = Object.keys(payload);
      state.osList = state.osList.map(e => {
        if(e.id === payload.id) {
          const obj = { ...e, [keys[1]]: payload[keys[1]], [keys[2]]: payload[keys[2]], [keys[3]]: payload[keys[3]]}; 
          return obj;
        }
        else {
          return e;
        }
      });
    },
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

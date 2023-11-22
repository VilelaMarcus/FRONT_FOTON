import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../redux/api/api-slice';

export const initialState = { 
  Lasers:[],
  currentMonthVisitCount: 0,
  lastMonthVisitCount: 0,
  newClients: 0,
  lastVists:[],
};
const slice = 'dashboard';

export const {
  endpoints,
  useReadDashboardInfoQuery,
  useReadEquipmentsQuery,
} = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: () => 'test',
    }),
    readDashboardInfo: build.query({
      query: (id) => `/dashboard/`,
      providesTags: ['Laser'],
    }),
    readEquipments: build.query({
      query: (id) => `/Laser/`,
      providesTags: ['Laser'],
    }),
  }),
  overrideExisting: false,
})


export const { reducer, actions } = createSlice({
  name: slice,
  initialState,
  reducers: { },
  extraReducers(builder) {
    builder.addMatcher(
      endpoints.readDashboardInfo.matchFulfilled,
      (state, { payload }) => {
        state.lastVists = payload.last10Visits
        state.currentMonthVisitCount = payload.currentMonthVisitCount
        state.lastMonthVisitCount = payload.lastMonthVisitCount

    }
    );
    builder.addMatcher(
      endpoints.readEquipments.matchFulfilled,
      (state, { payload }) => {
        state.Lasers = payload;
    }
    );
  },
});

export { slice };

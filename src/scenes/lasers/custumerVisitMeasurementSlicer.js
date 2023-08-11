import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../redux/api/api-slice';

export const initialState = { list: [] };
const slice = 'visitCustumerMeasurement';

export const {
  endpoints,
  useReadVisitCustumerByLaserIdQuery,
  useReadVisitCustumerByLaserNameQuery,
  useReadAwardsQuery,
  useUpdateTeamMemberMutation,
} = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: () => 'test',
    }),
    readVisitCustumerByLaserId: build.query({
      query: (id) => `/custumerMeasurement/${id}`,
      providesTags: ['Laser'],
    }),
    readVisitCustumerByLaserName: build.query({
      query: (name) => `/custumerMeasurement/${name}`,
  }),
  }),
  overrideExisting: false,
})





// .injectEndpoints({
//   overrideExisting: true,
//   // endpoints: (build) => ({
//     readVisitCustumerByLaserId: build({
//         query: (id) => `/custumerMeasurement/${id}`,
//         providesTags: ['Laser'],
//       }),
//       readVisitCustumerByLaserName: build({
//         query: (name) => `/custumerMeasurement/${name}`,
//     }),
//   // }),
// });

export const { reducer, actions } = createSlice({
  name: slice,
  initialState,
  reducers: {
    addTeamMember: (state, { payload }) => {
      state.list.push(payload);
    },
  },
  // extraReducers(builder) {
  //   builder.addMatcher(
  //     endpoints.readTeamMembers.matchFulfilled,
  //     (state, { payload }) => {
  //       state.list = payload;
  //     },
  //   );
  // },
});

export { slice };

// import { createSlice } from '@reduxjs/toolkit';
// import { apiSlice } from '../../redux/api/api-slice';

// export const initialState = {
//     list : [],
//     laserByName: {},
// };
// const slice = 'laser';

// export const {
//   endpoints,
//   useGetLaserQuery,
//   useGetLaserByNameQuery,
// } = apiSlice.injectEndpoints({
//   overrideExisting: true,
//   endpoints: (build) => ({
//     getLasers: build({
//         query: () => `/laser`,
//     }),
//     getLaserByname: build({
//         query: (name) => `/laser/${name}`,
//     }),
//   }),
// });

// // export const { reducer, actions } = createSlice({
// //   name: slice,
// //   initialState,
// //   reducers: {
// //     addTeamMember: (state, { payload }) => {
// //       state.list.push(payload);
// //     },
// //   },
// //   extraReducers(builder) {
// //     builder.addMatcher(
// //       endpoints.getLaserByname.matchFulfilled,
// //       (state, { payload }) => {
// //         state.list = payload;
// //       },
// //     );
// //   },
// // });

// export { slice };

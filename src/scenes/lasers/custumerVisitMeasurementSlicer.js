import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../redux/api/api-slice';

export const initialState = { 
  allegretto: [],
  intralaser: [],
  visx: [],
  constellation: [],
  lasersigth: [],
};
const slice = 'visitCustomerMeasurement';

export const {
  endpoints,
  useReadVisitCustumerByLaserIdQuery,
  useReadVisitCustumerByLaserNameQuery,
  useCreateVisitMeasurementMutation,
  useUpdateVisitMeasurementMutation,
  useReadAwardsQuery,
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
    updateVisitMeasurement: build.mutation({
      query: (body) => {
        return {
          url: `/custumerMeasurement/${body.id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    createVisitMeasurement: build.mutation({
      query: (body) => {
        return {
          url: `/custumerMeasurement/`,
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
    addNewDate: (state, { payload }) => {
      const name = payload.name;
      const keys = Object.keys(payload);
        switch (name) {
          case "Allegretto":
            state.allegretto = state.allegretto.map(e => {
              if(e.id === payload.excludedId) { 
                return payload;
              }
              else {
                return e;
              }
            });
            break;
          case "Intralaser":
            state.intralaser = state.intralaser.map(e => {
              if(e.id === payload.id) {
                const obj = { ...e, [keys[1]]: payload[keys[1]]}         
                return obj;
              }
              else {
                return e;
              }
            });
            break;
          case "Constellation":
            state.constellation = state.constellation.map(e => {
              if(e.id === payload.id) {
                const obj = { ...e, [keys[1]]: payload[keys[1]]}         
                return obj;
              }
              else {
                return e;
              }
            });
            break;
          case "Visx":
            state.visx = state.visx.map(e => {
              if(e.id === payload.id) {
                const obj = { ...e, [keys[1]]: payload[keys[1]]}         
                return obj;
              }
              else {
                return e;
              }
            });
          break;
          default:
      }
    },
    updateList: (state, { payload }) => {
      const name = payload.name;
      const keys = Object.keys(payload);
        switch (name) {
          case "Allegretto":
            const array = state.allegretto
            console.log({array}) 
            state.allegretto = state.allegretto.map(e => {
              if(e.id === payload.id) {
                const obj = { ...e, [keys[2]]: payload[keys[2]]}         
                return obj;
              }
              else {
                return e;
              }
            });
            break;
          case "Intralaser":
            state.intralaser = state.intralaser.map(e => {
              if(e.id === payload.id) {
                const obj = { ...e, [keys[1]]: payload[keys[1]]}         
                return obj;
              }
              else {
                return e;
              }
            });
            break;
          case "Constellation":
            state.constellation = state.constellation.map(e => {
              if(e.id === payload.id) {
                const obj = { ...e, [keys[1]]: payload[keys[1]]}         
                return obj;
              }
              else {
                return e;
              }
            });
            break;
          case "Visx":
            state.visx = state.visx.map(e => {
              if(e.id === payload.id) {
                const obj = { ...e, [keys[1]]: payload[keys[1]]}         
                return obj;
              }
              else {
                return e;
              }
            });
          break;
          default:
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      endpoints.readVisitCustumerByLaserName.matchFulfilled,
      (state, { payload }) => {
        const name = payload.name;
        switch (name) {
          case "Allegretto":
            state.allegretto = payload.visitMeasurement;
            break;
          case "Intralaser":
            state.intralaser = payload.visitMeasurement;
            break;
          // Add more cases as needed
          case "Constellation":
            state.constellation = payload.visitMeasurement;
            break;
          case "Visx":
            state.visx = payload.visitMeasurement;
          break;
          default:
      }
    }
    );
  },
});

export { slice };

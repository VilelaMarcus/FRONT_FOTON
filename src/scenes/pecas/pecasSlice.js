import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../redux/api/api-slice';

export const initialState = { 
  Pecas:[],
};
const slice = 'pecas';

export const {
  endpoints,
  useCreatePecasMutation,
  useReadPecasQuery,
  useEditPecaMutation,
} = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: () => 'test',
    }),
    createPecas: build.mutation({
      query: (body) => {
        return {
          url: `/pecas/`,
          method: 'POST',
          body,
        };
      },
    }),
    readPecas: build.query({
      query: (id) => `/pecas/`,
      providesTags: ['pecas'],
    }),
    editPeca: build.mutation({
      query: ({id, body}) => {
        return {
          url: `/pecas/${id}`,
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
    addEquipment: (state, { payload }) => {
      console.log({payload})
      state.Pecas.push(payload);
    },
    updatePeca: (state, { payload }) => {
      const keys = Object.keys(payload);
      state.Pecas = state.Pecas.map(e => {
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
      endpoints.readPecas.matchFulfilled,
      (state, { payload }) => {
        state.Pecas = payload;
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

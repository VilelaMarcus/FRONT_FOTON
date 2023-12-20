import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../redux/api/api-slice';

export const initialState = { 
  list: [],
  currentEquipments: []
};
const slice = 'owners';

export const {
  endpoints,
  useCreateEquipmentMutation,
} = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createEquipment: build.mutation({
      query: (body) => {
        return {
          url: `/customer/`,
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
    addCostumer: (state, { payload }) => {
      state.list.push(payload);
    },
    updateListEquipments: (state, { payload }) => {
      state.currentEquipments.push(payload);
    },
    deleteEquipment: (state, { payload }) => {
      console.log({payload})
      state.currentEquipments = state.currentEquipments.filter(e => e.id !== payload.id)
    },
  },
  extraReducers(builder) {
  },
});

export { slice };

import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '../redux/api/api-slice';
// import {
//   reducer as appLoadingReducer,
//   slice as appLoadingSlice,
// } from 'features/app-loading/app-loading-reducer';
import {
  reducer as customerReducer,
  slice as customerSlice,
} from '../scenes/customers/customerSlicer';
import {
  reducer as dashboardReducer,
  slice as dashboardSlicer,
} from '../scenes/dashboard/dashboardSlice';
import {
  reducer as visitCustumerMeasurementReducer,
  slice as visitCustumerMeasurementSlice,
} from '../scenes/lasers/custumerVisitMeasurementSlicer';

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [customerSlice]: customerReducer,
    [visitCustumerMeasurementSlice]: visitCustumerMeasurementReducer,
    [dashboardSlicer]: dashboardReducer,
});

const rootState = rootReducer(undefined, { type: '' });

export { rootReducer, rootState };

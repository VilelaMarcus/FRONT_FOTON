import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '../redux/api/api-slice';
// import {
//   reducer as appLoadingReducer,
//   slice as appLoadingSlice,
// } from 'features/app-loading/app-loading-reducer';
// import {
//   reducer as laserReducer,
//   slice as laserSlice,
// } from 'features/matches/matches-reducer';
import {
  reducer as visitCustumerMeasurementReducer,
  slice as visitCustumerMeasurementSlice,
} from '../scenes/lasers/custumerVisitMeasurementSlicer';

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [visitCustumerMeasurementSlice]: visitCustumerMeasurementReducer,
});

const rootState = rootReducer(undefined, { type: '' });

export { rootReducer, rootState };

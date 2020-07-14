import { createSelector } from '@reduxjs/toolkit';

const demoDataState = state => state.demoData;

export const getDemoDataStateData = createSelector(
  demoDataState,
  state => state.data
);
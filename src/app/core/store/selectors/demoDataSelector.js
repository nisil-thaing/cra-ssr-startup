import { createSelector } from '@reduxjs/toolkit';

const getDemoDataState = state => state.demoData;

export const getDemoDataStateData = createSelector(
  getDemoDataState,
  state => state.data
);
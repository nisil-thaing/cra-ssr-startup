import { createSelector } from '@reduxjs/toolkit';

const getUIState = state => state.ui;

export const getSupportedLanguages = createSelector(
  getUIState,
  state => state.supportedLanguages
);

export const getSelectedLanguageCode = createSelector(
  getUIState,
  state => state.selectedLanguageCode
);
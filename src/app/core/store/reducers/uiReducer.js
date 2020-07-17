import { createReducer } from '@reduxjs/toolkit';

import { UI_INITIAL_STATE } from 'app/core/store/states/uiState';

const reducer = createReducer(UI_INITIAL_STATE, {});

export default reducer;
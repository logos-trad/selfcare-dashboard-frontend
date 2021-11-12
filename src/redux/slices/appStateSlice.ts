import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AppStateState {
  loading: {
    result: boolean;
    tasks: { [taskId: string]: boolean };
  };
}

const initialState: AppStateState = {
  loading: {
    result: false,
    tasks: {},
  },
};

/* eslint-disable functional/immutable-data */
export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ task: string; loading: boolean }>) => {
      if (action.payload.loading) {
        state.loading.result = true;
        state.loading.tasks[action.payload.task] = true;
      } else {
        delete state.loading.tasks[action.payload.task];
        state.loading.result = Object.keys(state.loading.tasks).length > 0;
      }
    },
  },
});

export const appStateActions = appStateSlice.actions;
export const appStateReducer = appStateSlice.reducer;

export const appStateSelectors = {
  selectLoading: (state: RootState) => state.appState.loading.result,
};

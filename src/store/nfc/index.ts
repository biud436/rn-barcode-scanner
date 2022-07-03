import {createSlice} from '@reduxjs/toolkit';

export type NfcState = {
  isFound: boolean;
};

const initialState: NfcState = {
  isFound: false,
};

const slice = createSlice({
  name: 'nfc',
  initialState,
  reducers: {
    foundTag(state) {
      state.isFound = true;
    },
    resetFoundTag(state) {
      state.isFound = false;
    },
  },
});

export const {foundTag, resetFoundTag} = slice.actions;
export default slice.reducer;

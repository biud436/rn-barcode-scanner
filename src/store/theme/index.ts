import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Nullable<T> = T | null;

type ThemeState = {
  theme: Nullable<string>;
  darkMode: Nullable<boolean>;
};

const initialState: ThemeState = {
  theme: null,
  darkMode: null,
};

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(
      state,
      {payload: {darkMode, theme}}: PayloadAction<ThemeState>,
    ) {
      state.theme = theme;
      state.darkMode = darkMode;
    },
  },
});

export const {changeTheme} = slice.actions;
export default slice.reducer;

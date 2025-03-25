import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { translate } from '@data';

interface translate {
  language: string;
  // language: 'EN' | 'CN' | 'JP' | 'KR' | 'VT';
}

const initialState: translate = {
  language: 'EN',
};

const translateSlice = createSlice({
  name: 'translate',
  initialState,
  reducers: {
    setTranslate: (state, action: PayloadAction<translate['language']>) => {
      state.language = action.payload;
    },
  },
});

export const { setTranslate } = translateSlice.actions;
export default translateSlice.reducer;

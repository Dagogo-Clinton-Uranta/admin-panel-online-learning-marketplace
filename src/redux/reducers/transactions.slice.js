import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  isLoading: false,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    fetchTransactions: (state, action) => {
        state.transactions = action.payload;
        state.error = '';
        state.message = '';
      },
      isItLoading: (state, action) => {
        state.isLoading = action.payload;
    },
  },
});

const { actions, reducer } = transactionSlice;

export const {
 fetchTransactions,
 isItLoading,
} = actions;

export default reducer;



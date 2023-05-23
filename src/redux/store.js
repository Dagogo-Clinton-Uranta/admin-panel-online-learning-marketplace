import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import thunk from 'redux-thunk';
import storage from './storage';
import jobReducer from './reducers/job.slice';
import authReducer from './reducers/auth.slice';
import groupReducer from './reducers/group.slice';
import inboxReducer from './reducers/chat.slice';
import candidateReducer from './reducers/candidate.slice';
import transactionReducer from './reducers/transactions.slice';
// import chatReducer from '../chat-src/redux/slices/chat';



const reducers = combineReducers({
  jobs:jobReducer,
  auth: authReducer,
  group: groupReducer,
  // chat: chatReducer,
  inbox: inboxReducer,
  transaction: transactionReducer,
  candidates:candidateReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});


export default store;

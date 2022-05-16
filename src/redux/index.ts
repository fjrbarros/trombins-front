import { createStore, combineReducers } from 'redux';
import { user } from './user/reducers';
import { drawer } from './drawer/reducers';

const reducers = combineReducers({ user, drawer });

export const store = createStore(reducers);

export type RootState = ReturnType<typeof reducers>;

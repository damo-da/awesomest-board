import {createStore, combineReducers} from 'redux';
import drawer from '../reducers/drawer';
import user from '../reducers/user';

const rootReducer = combineReducers({info: drawer, user});

const  store = createStore(rootReducer);

export default store;

import {createStore, combineReducers} from 'redux';
import drawer from '../reducers/drawer';
import user from '../reducers/user';
import pencil from '../reducers/pencil';

const rootReducer = combineReducers({info: drawer, user, pencil});

const  store = createStore(rootReducer);

export default store;

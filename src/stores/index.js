import {createStore, combineReducers} from 'redux';
import page from '../reducers/page';
import user from '../reducers/user';
import pencil from '../reducers/pencil';

const rootReducer = combineReducers({info: page, user, pencil});

const  store = createStore(rootReducer);

export default store;

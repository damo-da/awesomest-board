import {createStore, combineReducers} from 'redux';
import page from '../reducers/page';
import user from '../reducers/user';
import pencil from '../reducers/pencil';
import snackBar from '../reducers/snackBar';

const rootReducer = combineReducers({info: page, user, pencil, snackBar});

const  store = createStore(rootReducer);

window.store = store;

export default store;

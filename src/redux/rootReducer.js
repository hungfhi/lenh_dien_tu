import { combineReducers } from 'redux';
import AppReducer from './reducers/App';

const rootReducer = combineReducers({

    rootReducer: AppReducer,

});

export default rootReducer;
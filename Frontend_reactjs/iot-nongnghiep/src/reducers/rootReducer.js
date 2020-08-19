import { combineReducers } from 'redux';
import tempReducer from './tempReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
    tempReducer,
    loginReducer
});

export default rootReducer;
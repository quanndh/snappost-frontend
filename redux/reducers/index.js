import { combineReducers } from 'redux'
import uiReducer from './uiReducer';
import userReducer from "./userReducer";
import newFeedReducer from './newFeedReducer';

export default combineReducers({
  uiReducer,
  userReducer,
  newFeedReducer
})
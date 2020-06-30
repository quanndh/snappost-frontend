import { combineReducers } from 'redux'
import uiReducer from './uiReducer';
import userReducer from "./userReducer";
import newFeedReducer from './newFeedReducer';
import uploadReducer from './uploadReducer';
import personalPostReducer from "./personalPostReducer";

export default combineReducers({
  uiReducer,
  userReducer,
  newFeedReducer,
  uploadReducer,
  personalPostReducer
})
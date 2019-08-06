import { combineReducers } from 'redux'
import userReducer from './module/user/reducers'

export default combineReducers({
  user: userReducer
})
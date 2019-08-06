import { SET_TOKEN, SET_USER_INFO } from './constant'
const data = {
  token: null,
  userInfo: {}
}
export default (state = data, action) => {
  if (action.type === SET_TOKEN) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.token = action.data
    return newState
  } else if (action.type === SET_USER_INFO) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.userInfo = action.data
    return newState
  }
  return state
}
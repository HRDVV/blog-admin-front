import { LAYOUT_ACTION, LOGIN_ACTION } from './constant'
const data = {
  isLogin: false
}
export default (state = data, action) => {
  if (action.type === LAYOUT_ACTION) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.isLogin = false
    return newState
  } else if (action.type === LOGIN_ACTION) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.isLogin = action.data
    return newState
  }
  return state
}
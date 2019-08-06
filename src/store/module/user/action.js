import { SET_TOKEN, SET_USER_INFO } from './constant'

export const _changeToken = data => (
  {
    type: SET_TOKEN,
    data
  }
)
export const _setUserInfo = data => (
  {
    type: SET_USER_INFO,
    data
  }
)
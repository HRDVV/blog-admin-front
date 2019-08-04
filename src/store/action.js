import { LAYOUT_ACTION, LOGIN_ACTION } from './constant'

export const _layoutAction = () => (
  {
    type: LAYOUT_ACTION
  }
)

export const _changeLoginStatusAction = (data) => (
  {
    type: LOGIN_ACTION,
    data
  }
)
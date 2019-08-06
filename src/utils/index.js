import { _changeToken } from '../store/module/user/action'
import { store } from '../store/index'

export function initEditor() {
  return window.Mditor
}
export function jumpLoginpage() {
  const action = _changeToken(null)
  store.dispatch(action)
}
export function getToken() {
  return store.getState().user.token
}

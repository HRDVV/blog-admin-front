import ajax from '../ajax/index'

export default {
  login(data) {
    return ajax({
      url: '/user/login',
      method: 'post',
      data
    })
  },
  logout() {
    return ajax({
      url: '/user/logout',
      method: 'post'
    })
  },
  isLogin() {
    return ajax({
      url: '/check/isLogin',
      method: 'get',
    })
  }
}
import ajax from '../ajax/index'

export default {
  login(params) {
    return ajax({
      url: '/mock/login.json',
      method: 'get',
      params
    })
  }
}
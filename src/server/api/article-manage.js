import ajax from '../ajax/index'

export default {
  getBlogList(params) {
    return ajax({
      url: '/blog/list',
      method: 'get',
      params
    })
  },
  saveArticle(data) {
    return ajax({
      url: '/blog/save',
      method: 'post',
      data
    })
  },
  updateArticle(data) {
    return ajax({
      url: '/blog/update',
      method: 'post',
      data
    })
  },
  getBlog(params) {
    return ajax({
      url: '/blog/getBlog',
      method: 'get',
      params
    })
  },
  delBlog(params) {
    return ajax({
      url: '/blog/delBlog',
      method: 'get',
      params
    })
  }
}
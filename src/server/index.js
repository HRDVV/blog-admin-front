import user from './api/user'
import articleManage from './api/article-manage'

export const api = {
  ...user,
  ...articleManage
}
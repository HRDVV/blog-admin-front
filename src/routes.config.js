import Login from './pages/login/index'
import ArticleManage from './pages/article-manage/index'
import Article from './pages/article-manage/artilcle'

export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: ArticleManage,
    auth: true
  }
  {
    path: '/article',
    component: ArticleManage,
    auth: true
  },
  {
    path: '/article/:status',
    component: Article,
    auth: true
  }
]
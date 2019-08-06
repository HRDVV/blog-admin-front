import React, { Fragment } from 'react'
import { HashRouter as Router, Route, Redirect, Switch, Prompt } from 'react-router-dom'
import Login from './pages/login/index'
import Layout from './layout/BaseLayout/index'
import ArticleManage from './pages/article-manage/index'
import Article from './pages/article-manage/artilcle'
import { connect } from 'react-redux'
import { _changeToken } from './store/module/user/action'
import { api } from './server/index'
import './App.scss'

class App extends React.Component {

  render() {
    return (
      <Router>
        <Prompt message={
          async(location) => {
            try {
              let res = await api.isLogin()
              if (res.success) {
                return true
              } else {
                if (res.code === 401) {
                  this.props.changeToken(null)
                }
                return false
              }
            } catch(e) {
              console.error(e)
              return false
            }
          }
        }/>
        <Switch>
          {
            !this.props.isLogin
            ?
            (
              <Fragment>
                <Route path="/login" component={Login} exact />
                <Redirect from="*" to="/login" exact />
              </Fragment>
            )
            :
            (
            <Layout>
              <Route path="/" component={ ArticleManage } exact />
              <Route path="/article" component={ ArticleManage } exact />
              <Route path="/article/add" component={ Article } exact />
              <Route path="/article/edit/:id" component={ Article } exact />
            </Layout>
            )
          }
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: !!state.user.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeToken(data) {
      const action = _changeToken(data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

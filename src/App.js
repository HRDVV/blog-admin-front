import React, { Fragment } from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { message } from 'antd'
import Login from './pages/login/index'
import Layout from './layout/BaseLayout/index'
import ArticleManage from './pages/article-manage/index'
import Article from './pages/article-manage/artilcle'
import { connect } from 'react-redux'
import { _changeLoginStatusAction } from './store/action'
import { api } from './server/index'
import './App.scss'

class App extends React.Component {

  componentDidMount() {
    this._checkIsLogin()
  }

  _checkIsLogin() {
    api.login({}).then(res => {
      if (res.success) {
        this.props.changeLoginStatus(!!res.data)
      } else {
        message.error(res.message)
      }
    }, err => {
      console.error(err)
    })
  }

  render() {
    return (
      <Router>
        <Switch>
          {
            !this.props.isLogin
            ?
            (
              <Fragment>
                <Route path="/login" component={Login} exact />
                <Redirect from="*" to="login" />
              </Fragment>
            )
            :
            (
            <Layout>
              <Redirect from="/" to="/article" exact />
              <Route path="/article" component={ ArticleManage } exact />
              <Route path="/article/:status" component={ Article } exact />
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
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeLoginStatus(data) {
      const action = _changeLoginStatusAction(data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

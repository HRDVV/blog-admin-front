import React, { Component } from 'react'
import { Layout, Menu, Icon, Avatar, Button, message } from 'antd'
import { connect } from 'react-redux'
import { api } from '../../server/index'
import { _layoutAction } from '../../store/action'
import './index.scss'

const { Header, Sider, Content } = Layout

class BaseLayout extends Component {
  state = {
    collapsed: false,
    userInfo: {
      userName: null,
      userId: null
    }
  }

  _layout = () => {
    this.props.layoutDispatch()
  }

  _login = () => {
    this.props.history.push('/login')
  }

  getUserInfo() {
    api.login({}).then(res => {
      if (res.success) {
        console.log(res.data)
        this.setState({
          userInfo: res.data
        })
      } else {
        message.error(res.message)
      }
    }, err => {
      console.error(err)
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  componentDidMount() {
    this.getUserInfo()
  }

  render() {
    return (
      <Layout 
        className="ly-layout-wraper"
      >
        <Sider
          className="ly-sider"
          trigger={null} 
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="ly-logo">{ this.state.collapsed ? 'admin' : '博客后台管理系统' }</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="snippets" />
              <span>文章管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ minWidth: '980px' }}>
          <Header className="ly-header">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
              {
                (() => {
                  if (this.state.userInfo.userId) {
                    return (
                      <div>
                        <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="large">
                          { this.state.userInfo.userName }
                        </Avatar>
                        <Button type="link" onClick={ this._layout }>退出</Button>
                      </div>
                    )
                  } else {
                    return (
                      <div>
                        <Button type="link" onClick={ this._login }>请登录</Button>
                      </div>
                    )
                  }
                })()
              }

          </Header>
          <Content
            style={{
              margin: '24px 12px',
              background: '#fff'
            }}
          >
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    layoutDispatch() {
      const action = _layoutAction()
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(BaseLayout)
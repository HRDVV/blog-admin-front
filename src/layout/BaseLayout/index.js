import React, { Component } from 'react'
import { Layout, Menu, Icon, Avatar, Button } from 'antd'
import { connect } from 'react-redux'
import { _changeToken } from '../../store/module/user/action'
import './index.scss'

const { Header, Sider, Content } = Layout

class BaseLayout extends Component {
  state = {
    collapsed: false
  }

  _layout = () => {
    this.props.changeToken(null)
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
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
                  if (this.props.userInfo.aud) {
                    return (
                      <div>
                        <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="large">
                          { this.props.userInfo.aud.slice(0,1).toUpperCase() }
                        </Avatar>
                        <Button type="link" onClick={ this._layout }>退出</Button>
                      </div>
                    )
                  } else {
                    return (
                      <div>
                        <Button type="link">未登录</Button>
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

const mapStateToProps = state => {
  return {
    userInfo: JSON.parse(state.user.userInfo)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeToken(data) {
      const action = _changeToken(data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout)
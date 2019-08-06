import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { connect } from 'react-redux'
import { Base64 } from 'js-base64'
import { api } from '../../server/index'
import { _changeToken, _setUserInfo } from '../../store/module/user/action'
import './index.scss'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <p className="login-title">博客后台管理系统</p>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '用户名不能为空' },
              { min: 2, max: 8, message: '请输入2-8个字符' }
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '密码不能为空' },
              { min: 5, max: 12, message: '请输入5-12个字符' }
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Button 
              type="primary" 
              htmlType="submit"
              block
              className="login-form-button"
            >
              登录
            </Button>
            {/* <Button type="link">现在注册?</Button> */}
          </div>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)

class Login extends Component {

  _login = (params) => {
    api.login(params).then(res => {
      if (res.success) {
        let userInfo = Base64.decode(res.data.split('.')[1])
        this.props.setUserInfo(userInfo)
        this.props.changeToken(res.data)
        this.props.history.push('/article')
      } else {
        message.error(res.message)
      }
    }, err => {
      console.error(err)
    })
  }

  render() {
    return (
    <div className="login-wraper">
      <WrappedNormalLoginForm login={ this._login }/>
    </div>
   )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo(data) {
      const action = _setUserInfo(data)
      dispatch(action)
    },
    changeToken(data) {
      const action = _changeToken(data)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
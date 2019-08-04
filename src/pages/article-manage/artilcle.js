import React, { Component, Fragment } from 'react'
import { PageHeader, Form, Input, Button } from 'antd'
import { initEditor } from '../../utils/index'

const { Item } = Form

class ArticleForm extends Component {

  state = {
    mditor: null
  }

  componentDidMount() {
    this.setState(() => {
      return {
        mditor: initEditor().fromTextarea(document.getElementById('editor'))
      }
    })
  }

  componentWillUnmount() {
    let dom = document.getElementsByClassName('mditor')[0]
    dom && dom.remove()
    this.setState(() => {
      return {
        mditor: null
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Fragment>
        <Form 
          layout="inline"
          style={{ padding: '0 15px', height: '70px' }}
        >
          <Item label="文章名称">
            {
              getFieldDecorator('articleName', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  }
                ]
              })(<Input placeholder="请输入文章名称" />)
            }
          </Item>
          <Item label="文章分类">
            { 
              getFieldDecorator('category', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  }
                ]
              })(<Input placeholder="请输入文章分类" />)
            }
          </Item>
        </Form>
        <textarea name="editor" id="editor"></textarea>
        <div style={{ textAlign: 'right', padding: '0 10px' }}>
          <Button 
            type="primary"
            style={{ marginTop: '10px' }}
            onClick={
              () => {
                this.props.form.validateFields((err, values) => {
                  if (!err) {
                    console.log('Received values of form: ', values);
                  }
                })
              }
            }
          >
            保存
          </Button>
        </div>
      </Fragment>
    )

  }
}

const ArticleFormWraper = Form.create({ name: 'article' })(ArticleForm)

class Article extends Component {

  render() {
    return (
      <Fragment>
        <PageHeader 
          onBack={() => {
            this.props.history.push('/article')
          }} 
          title="回到列表" 
        />
        <ArticleFormWraper />
      </Fragment>
    )
  }
}


export default Article
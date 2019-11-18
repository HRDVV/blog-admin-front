import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { PageHeader, Form, Input, Button, message, Spin } from 'antd'
import { initEditor } from '../../utils/index'
import { api } from '../../server/index'

const { Item } = Form

class ArticleForm extends Component {

  id = this.props.match.params.id

  state = {
    mditor: null,
    loading: false,
    getDataLoading: this.id ? true : false
  }

  componentDidMount() {
    this.setState(() => {
      return {
        mditor: initEditor().fromTextarea(document.getElementById('editor'))
      }
    }, () => {
      if (this.id) {
        this._getBlogById(this.id)
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

  _getBlogById(id) {
    api.getBlog({ id }).then(res => {
      this.setState({ getDataLoading:false })
      if (res.success) {
        this.state.mditor.value = res.data.content
        this.props.form.setFieldsValue({
          title: res.data.title,
          categories: res.data.categories
        })
      } else {
        this.setState({ getDataLoading:false })
        message.error(res.message)
      }
    }, err => {
      this.setState({ getDataLoading:false })
      console.error(err)
    })
  }

  _saveArtitle = async(data) =>  {
    let res
    this.setState({ loading: true })
    if (this.id) {
      res = await api.updateArticle(data)
    } else {
      res = await api.saveArticle(data)
    }
    this.setState({ loading: false })
    if (res.success) {
      message.success('保存成功')
      // this.props.history.push('/article')
    } else {
      this.setState({ loading: false })
      message.error(res.message)
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Spin size="large" spinning={this.state.getDataLoading}>
        <Form 
          layout="inline"
          style={{ padding: '0 15px', height: '70px' }}
        >
          <Item label="文章名称">
            {
              getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '文章名称不能为空',
                  }
                ]
              })(<Input placeholder="请输入文章名称" />)
            }
          </Item>
          <Item label="文章分类">
            { 
              getFieldDecorator('categories', {
                rules: [
                  {
                    required: true,
                    message: '文章分类不能为空'
                  },
                  // {
                  //   validator: (rule, value, callback) => {
                  //     if (!/^[0-9a-zA-Z\w,]+$/.test(value)) {
                  //       callback(new Error('只能包含数字、字母和英文逗号'))
                  //     } else {
                  //       callback()
                  //     }
                  //   }
                  // }
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
            loading={ this.state.loading }
            onClick={
              () => {
                this.props.form.validateFields((err, values) => {
                  if (!err) {
                    if (this.state.mditor.value.trim() === '') {
                      return message.error('文章内容不能为空')
                    }
                    const data = {
                      ...values,
                      content: this.state.mditor.value
                    }
                    if (this.id) {
                      data.id = Number(this.id)
                    }
                    this._saveArtitle(data)
                  }
                })
              }
            }
          >
            保存
          </Button>
        </div>
      </Spin>
    )

  }
}

const ArticleFormWraper = withRouter(Form.create({ name: 'article' })(ArticleForm))

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
        <ArticleFormWraper/>
      </Fragment>
    )
  }
}


export default Article
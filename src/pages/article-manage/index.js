import React, { Component, Fragment } from 'react'
import { Button, Form , Table, Upload, Icon, message, Tag, Popconfirm } from 'antd'
import { getToken } from '../../utils/index'
import { api } from '../../server/index'
import './index.scss'

const { Item } = Form

const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9']

class ArticleManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleName: null,
      articleTime: null,
      current: 1,
      total: 0,
      dataSource: [],
      loading: false
    }
    this.columns = [
      {
        title: '文章名称',
        dataIndex: 'title'
      },
      {
        title: '作者',
        dataIndex: 'author'
      },
      {
        title: '分类',
        dataIndex: 'categories',
        render: (text, record, index) => {
          return record.categories.split(',').map((item, index) => {
            return <Tag key={index} color={colors[Math.floor(Math.random() * 5)]}>{ item }</Tag>
          })
        }
      },
      {
        title: '撰写时间',
        dataIndex: 'updateTime'
      },
      {
        title: '操作',
        width: 250,
        render: (text, record, index) => (
          <Fragment>
            <Button 
              type="primary" 
              style={{ marginRight: '5px' }}
              onClick={ () => { this._editArticle(record) } }
            >编辑</Button>
            <Popconfirm 
              title="Are you sure？" 
              okText="是" 
              cancelText="否"
              onConfirm={this._delBlog.bind(this, record.id)}
            >
              <Button type="danger">删除</Button>
            </Popconfirm>
            <Button style={{marginLeft: '5px'}}>
              <a 
                href={`http://114.67.66.81:8081/blog/download?id=${record.id}&token=${getToken()}`} 
                style={{color: 'inherit'}}>下载</a>
            </Button>
          </Fragment>
        )
      }
    ]
    // this._articleNameChange = this._articleNameChange.bind(this)
    // this._articleTimeChange = this._articleTimeChange.bind(this)
    this._handleSearch = this._handleSearch.bind(this)
    // this._currentPageChange = this._currentPageChange.bind(this)
    this._createArticle = this._createArticle.bind(this)
  }

  // _articleNameChange(e) {
  //   let value = e.target.value
  //   this._setState('articleName', value)
  // }

  // _articleTimeChange(val) {
  //   this._setState('articleTime', val)
  // }

  _handleSearch() {
    this._getBlogList()
  }

  // _currentPageChange(page, pageSize) {
  //   console.log(page, pageSize)
  // }

  _createArticle() {
    this.props.history.push({
      pathname: '/article/add'
    })
  }

  _editArticle(record) {
    this.props.history.push({
      pathname: `/article/edit/${record.id}`,
    })
  }

  _delBlog = (id) => {
    api.delBlog({ id }).then(res => {
      if (res.success) {
        this._getBlogList()
      } else {
        message.error(res.message)
      }
    }, err => {
      console.error(err)
    })
  }

  _setState(field, value) {
    this.setState(() => {
      return {
        [field]: value
      }
    })
  }
  _getBlogList() {
    this.setState({ loading: true })
    api.getBlogList({}).then(res => {
      this.setState({ loading: false })
      if (res.success) {
        this.setState(() => (
          {
            dataSource: res.data,
            total: res.data.length
          }
        ))
      } else {
        this.setState({ loading: false })
        message.error(res.message)
      }
    }, err => {
      this.setState({ loading: false })
      console.error(err)
    })
  }

  componentDidMount() {
    this._getBlogList()
  }

  render() {
    return (
      <Fragment>
        <Form 
          layout="inline"
          className="form-wraper"
        >
          <Item>
            <Button 
              type="primary"
              onClick={ this._createArticle }
            >
              新建文章
            </Button>
          </Item>
          <Item>
            <Upload 
              action={`http://114.67.66.81:8081/blog/upload?token=${getToken()}`}
              beforeUpload={(file) => {
                return true
              }}
              onChange={({ file }) => {
                if (file.status === 'done') {
                  if (file.response.success) {
                    this._getBlogList()
                  } else {
                    message.error(file.response.message)
                  }
                }
              }}
              showUploadList={false}
            >
              <Button>
                <Icon type="upload" /> 上传文章
              </Button>
            </Upload>
          </Item>
        </Form>
        <Table
          bordered
          loading={this.state.loading}
          rowKey={ (data) => data.id }
          className="table-wraper"
          columns={ this.columns }
          dataSource={ this.state.dataSource }
          pagination={false}
        />
      </Fragment>
    )
  }
}

export default ArticleManage
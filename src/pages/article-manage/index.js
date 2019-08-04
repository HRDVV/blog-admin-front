import React, { Component, Fragment } from 'react'
import { Button, Form, Input, DatePicker, Table, Upload, Icon } from 'antd'
import './index.scss'

const { Item } = Form

const dataSource = [
  {
    id: 1,
    articleName: '2345'
  },
  {
    id: 2,
    articleName: '23456'
  }
]

class ArticleManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleName: null,
      articleTime: null,
      current: 1,
      total: 0
    }
    this.columns = [
      {
        title: '文章名称',
        dataIndex: 'articleName'
      },
      {
        title: '作者',
        dataIndex: 'author'
      },
      {
        title: '分类',
        dataIndex: 'category'
      },
      {
        title: '撰写时间',
        dataIndex: 'articleTime'
      },
      {
        title: '操作',
        width: 200,
        render: (text, record, index) => (
          <Fragment>
            <Button 
              type="primary" 
              style={{ marginRight: '5px' }}
              onClick={ () => { this._editArticle(record) } }
            >编辑</Button>
            <Button type="danger">删除</Button>
          </Fragment>
        )
      }
    ]
    this._articleNameChange = this._articleNameChange.bind(this)
    this._articleTimeChange = this._articleTimeChange.bind(this)
    this._handleSearch = this._handleSearch.bind(this)
    this._currentPageChange = this._currentPageChange.bind(this)
    this._createArticle = this._createArticle.bind(this)
  }

  _articleNameChange(e) {
    let value = e.target.value
    this._setState('articleName', value)
  }

  _articleTimeChange(val) {
    this._setState('articleTime', val)
  }

  _handleSearch() {
    
  }

  _currentPageChange(page, pageSize) {
    console.log(page, pageSize)
  }

  _createArticle() {
    this.props.history.push({
      pathname: '/article/add'
    })
  }

  _editArticle(record) {
    this.props.history.push({
      pathname: `/article/edit?id=${record.id}`
    })
  }

  _setState(field, value) {
    this.setState(() => {
      return {
        [field]: value
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Form 
          layout="inline"
          className="form-wraper"
        >
          <Item label="文章名称">
            <Input
              placeholder="请输入文章名称"
              value={ this.state.articleName }
              onChange={ this._articleNameChange }
            />
          </Item>
          <Item label="撰写时间">
            <DatePicker
              placeholder="请选择撰写时间"
              value={ this.state.articleTime }
              onChange={ this._articleTimeChange }
            />
          </Item>
          <Item>
            <Button type="primary" onClick={ this._handleSearch }>
              查询
            </Button>
          </Item>
          <Item>
            <Button onClick={ this._createArticle }>
              新建文章
            </Button>
          </Item>
          <Item>
            <Upload 
              action="//jsonplaceholder.typicode.com/posts/"
              beforeUpload={(file) => {
                return true
              }}
              onChange={({ file }) => {
                console.log(file.status)
                // console.log(file)
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
          rowKey={ (data) => data.id }
          className="table-wraper"
          columns={ this.columns }
          dataSource={ dataSource }
          pagination={{ 
            current: this.state.current,
            total: this.state.total,
            pageSize: 20,
            onChange: this._currentPageChange
          }}
        />
      </Fragment>
    )
  }
}

export default ArticleManage
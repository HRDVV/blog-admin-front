import axios from 'axios'
import { jumpLoginpage, getToken } from '../../utils/index'
// import { Spin } from 'antd'

const isDev = process.env.NODE_ENV === 'development'

const instance = axios.create({
  timeout: 5000,
  baseURL: isDev ? '/' : 'http://114.67.66.81:8081',
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})

// let spinning = null
instance.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Bearer ${getToken()}`
  // spinning = Spin.setDefaultIndicator()
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  // spinning && spinning.close()
  if (response && response.data.code === 401) {
    jumpLoginpage()
  }

  return response.data;
}, function (error) {
  // spinning && spinning.close()
  return Promise.reject(error);
});


export default instance
import axios from 'axios'
// import { Spin } from 'antd'

const isDev = process.env.NODE_ENV === 'development'

const instance = axios.create({
  baseURL: isDev ? 'http://localhost:3000' : '/',
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})

// let spinning = null
instance.interceptors.request.use(function (config) {
  // spinning = Spin.setDefaultIndicator()
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  // spinning && spinning.close()
  return response.data;
}, function (error) {
  // spinning && spinning.close()
  return Promise.reject(error);
});


export default instance
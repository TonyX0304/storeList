import axios from 'axios'
import { Toast } from 'antd-mobile'

let baseURL = '/';
const _axios = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

// 请求拦截器
_axios.interceptors.request.use(function (config) {
  // 开启loading
  showLoading()
  return config;
}, function (error) {
  showFailToast()
  return Promise.reject(error);
});

// 相应拦截器
_axios.interceptors.response.use(function (response) {
  setTimeout(() => {
    hideLoading()
  }, 1000);
  return response.data;
}, function (error) {
  hideLoading()
  showFailToast()
  return Promise.reject(error);
});


/**
 * 显示loading
 */
function showLoading(msg = '加载中...', time = 0) {
  Toast.loading(msg, time);
}

/**
 * 隐藏loading
 */
function hideLoading() {
  Toast.hide();
}

function showFailToast() {
  Toast.fail('服务器错误', 2);
}

export default _axios
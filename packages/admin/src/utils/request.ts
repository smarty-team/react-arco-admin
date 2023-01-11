import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Modal, Message } from '@arco-design/web-react';

// create an axios instance
const service = axios.create({
  // baseURL: import.meta.env.API_BASE, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something before request is sent
    // 获取本地存储的token，若存在附加在请求头上
    const token = localStorage.getItem('token');
    if (token) {
      // let each request carry token
      // ['Authorization'] is a custom headers key
      // please modify it according to the actual situation
      // 在这里附加令牌
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    // 根据状态码决定错误处理方式：
    // 403-需要重新登陆
    console.log('err' + error); // for debug

    // 处理 HTTP 网络错误
    let message = '';
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = error.response?.data?.message || 'token失效，请重新登录';
        // 这里可以触发退出的 action
        Modal.confirm({
          title: '没有权限',
          content: message,
          okText: '去登录',
          cancelText: '取消',
          onOk: () => {
            // 清除过期令牌
            localStorage.removeItem('token');
            localStorage.removeItem('userStatus');

            // 去登录页面
            window.location.href = '/login';
          },
        });
        break;
      case 403:
        message = error.response?.data?.message || '拒绝访问';
        break;
      case 404:
        message = error.response?.data?.message || '请求地址错误';
        break;
      case 500:
        message = error.response?.data?.message || '服务器故障';
        break;
      default:
        message = error.response?.data?.message || '网络连接故障';
    }
    Message.error(message);
    return Promise.reject(error);
  }
);

export default service;

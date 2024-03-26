import axios from 'axios';
// import { Message } from 'element-ui'

// create an axios
const service = axios.create({
  /* baseURL:
    window.location.protocol +
    "//" +
    window.location.host.split("/")[0].split(":")[0] +
    ":9091/api", // api的base_url */
  baseURL: 'http://192.168.1.6:9091/api',
  timeout: 30000, // request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    if (localStorage.token) {
      console.log('Token found');
      config.headers['Authorization'] = localStorage.token;
    } else {
      console.log('No token found');
      config.headers['Authorization'] = '43f44388-5cd1-4657-9f7e-ea4e014e9333';
    }
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Credentials'] = 'true';
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  (response) => response,
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  (error) => {
    console.log('err' + error); // for debug
    /*  Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    */
    return Promise.reject(error);
  }
);

export default service;

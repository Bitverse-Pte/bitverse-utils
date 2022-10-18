import axios from 'axios'

/**
 * 创建 axios 请求实例
 * 注意：get 请求需要传 params，post 请求需要传 data。
 * @see https://axios-http.com/docs/api_intro
 */
const axiosHttp = axios.create({
  // baseURL: baseURL, // 基础请求地址,由业务方传入,此处不指定
  timeout: 100000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
})

/**
 * http request 拦截器
 */
axiosHttp.interceptors.request.use(
  (config) => {
    config.debug && console.log('request is ', config)
    config.headers = {
      'Content-Type': 'application/json',
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * http response 拦截器
 */
axiosHttp.interceptors.response.use(
  (response) => {
    response.config.debug && console.log('response is ', response)
    if (response.data.retCode === 0) {
      return response.data.result
    } else {
      return Promise.reject(response.data)
    }
  },
  (error) => {
    showErrorMsg(error)
    console.log('请求出错：', error)
    return Promise.reject(error)
  }
)

// 失败提示
function showErrorMsg(error: any) {
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        message = '参数不正确！'
        break
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！'
        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP 版本不受支持！'
        break
      default:
        message = '异常问题，请联系管理员！'
        break
    }
  }
}

export default axiosHttp

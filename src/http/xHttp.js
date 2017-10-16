import axios from 'axios'
// import config from '../../config'
import codes from '../codes/apiResultCodes'
import ex from '../api/exception'

function successParse (res, validator, errorHandling) {
  let obj = res.data
  // 业务成功处理
  if (validator(obj)) {
    return Promise.resolve(obj)
  } else {
    // 业务失败处理
    if (!errorHandling) {
      // 通用业务失败处理
      ex.errorMsgNotification(obj.code, obj.desc)
      return Promise.reject()
    } else {
      return Promise.resolve({customValidatorFail: true, ...obj})
    }
  }
}

function errorParse (error, exceptionHandling) {
  // 接口异常处理
  if (error) {
    let status = -1
    if (error.response && error.response.status) {
      status = error.response.status
    }
    if (!exceptionHandling) {
      // 通用接口异常处理
      ex.errorMsgNotification(-1)
    }
    return Promise.reject({ex: status})
  } else {
    /**
     * 通用业务失败处理后，交由前台处理（关闭loading等）
     * 例如 ：
     * catch((ex) => { // 这里的ex必须由接口层，业务层，页面层一级一级向上传递
     *     if (!ex) {
     *       // 处理业务异常
     *     }
     *     // 处理接口异常
     *   })
     */
    return Promise.reject()
  }
}

function requestUrl (url) {
  // 测试/生成环境
  if (process.env.NODE_ENV !== 'development') {
    if (url.startsWith('/dxbApi')) {
      // 同域名下还原请求地址
      if (window.location.href.startsWith('https')) {
        url = 'https://poc.51pinzhi.cn/' + url.substring(8)
      } else {
        url = 'http://poc.51pinzhi.cn/' + url.substring(8)
      }
    } else if (!url.startsWith('http')) {
      // 测试环境
      if (process.env.NODE_ENV === 'testing') {
        if (url.startsWith('/prodApi')) {
          // 测试环境，访问test接口
          url = url.replace('/prodApi', '/testApi/poc')
        }
      } else {
        if (url.startsWith('/prodApi')) {
          // 生产环境替换接口地址
          url = url.replace('/prodApi', '/prodApi/poc')
        }
      }
      // 线上地址加上项目名区分
      url = '/proxy/' + url.substring(1)
    }
  } else {
    if (url.startsWith('/policeApi')) {
    }
  }
  return url
}

function send (url, method, body, options, validator, errorHandling, exceptionHandling) {
  // 生成请求url
  url = requestUrl(url)
  const opts = {...options}
  opts.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authentication': window.$globalHub.$store.state.auth.token || '',
    ...opts.headers
  }
  // body.token = window.$globalHub.$store.state.auth.token || ''
  switch (method) {
    case 'get':
      return axios.get(url, opts)
        .then(res => successParse(res, validator, errorHandling))
        .catch(error => errorParse(error, exceptionHandling))
    case 'post':
      return axios.post(url, body, opts)
        .then(res => successParse(res, validator, errorHandling))
        .catch(error => errorParse(error, exceptionHandling))
  }
}

export default {
  get (url, {options = null, validator = (res) => res.code === codes.SUCCESS, errorHandling = false, exceptionHandling = false} = {}) {
    return send(url, 'get', null, options, validator, errorHandling, exceptionHandling)
  },
  post (url, body, {options = null, validator = (res) => res.code === codes.SUCCESS, errorHandling = false, exceptionHandling = false} = {}) {
    return send(url, 'post', body, options, validator, errorHandling, exceptionHandling)
  },
  upload (url, body, options) {
    return axios.post(url, body, options)
      .then(res => successParse(res, (res) => res.code === codes.SUCCESS, false))
      .catch(error => errorParse(error, false))
  }
}

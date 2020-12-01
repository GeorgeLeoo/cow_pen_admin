import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

interface Queue {
  [propName: string]: boolean;
}

class HttpRequest {
  private baseURL = ''
  private queue: Queue = {}

  constructor (baseURL: string) {
    this.baseURL = baseURL
  }

  getInsideConfig () {
    const config: AxiosRequestConfig = {
      baseURL: this.baseURL,
      headers: {}
    }
    return config
  }

  destroy (url: string) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // 隐藏loading
    }
  }

  interceptors (instance: AxiosInstance, url: string) {
    instance.interceptors.request.use(config => {
      if (!Object.keys(this.queue).length) {
        // 添加全局loading
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })

    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      // addErrorLog()
      return Promise.reject(error)
    })
  }

  request (options: AxiosRequestConfig) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig, options)
    this.interceptors(instance, options.url ? options.url : '')
    return instance(options)
  }
}

export default HttpRequest

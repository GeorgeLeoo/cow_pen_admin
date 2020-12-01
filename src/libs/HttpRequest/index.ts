import HttpRequest from '@/libs/HttpRequest/HttpRequest'
import config from '@/config'

const baseURL = process.env.NODE_ENV === 'development'
  ? config.baseUrl.dev : config.baseUrl.pro

const request = new HttpRequest(baseURL)

export default request

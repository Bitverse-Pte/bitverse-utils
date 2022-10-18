import axiosHttp from './axios'
import { request } from '@bitverse/jsbridge'
import { inBitverse } from '@/utils/'

interface RequestParams {
  method: 'post' | 'get'
  url: string
  headers?: Record<string, any>
  body?: Record<string, any>
  timeout?: number
  contentType?: string
  responseType?: string
}

export default {
  async request(options: RequestParams) {
    // console.log('request 参数: ', options, inBitverse)
    if (inBitverse) {
      // const baseURL = import.meta.env.VITE_API_DOMAIN
      const baseURL = ''
      const params = {
        ...options,
        url: baseURL + options.url,
        contentType: 'application/json; charset=utf-8',
      }
      // 调用 bridge
      console.log('@ bridge.request 参数:', params)

      const response = await request(params)
      console.log('@ bridge.request reponse', response)
      if (response?.status === 200) {
        if (response.body.retCode === 0) {
          return response.body.result
        } else {
          return response.body
        }
      } else {
        return Promise.reject(response?.body)
      }
    } else {
      let axiosOptions = {}
      if (options.method.toLowerCase() === 'get') {
        axiosOptions = {
          ...options,
          params: options.body,
        }
      } else if (options.method.toLowerCase() === 'post') {
        axiosOptions = {
          ...options,
          data: options.body,
        }
      }

      // App 外环境
      return await axiosHttp.request(axiosOptions)
    }
  },
}

import axiosHttp from './axios'
import { request } from '@bitverse/jsbridge'
import { inBitverse } from '@/utils/'

interface requestOptionType {
  /**
   * 完整的接口url，包含baseUrl + path
   * 如：https://api2.bitverse-dev-1.bybit.com/bitverse/bitdapp/v1/public/worldcup/activity/guess
   */
  url: string
  method: 'post' | 'get'
  body?: Record<string, any>
  timeout?: number
  contentType?: string
  responseType?: string
  debug?: boolean
}

export default {
  async request(options: requestOptionType) {
    if (inBitverse) {
      const params = {
        ...options,
        contentType: 'application/json; charset=utf-8',
      }
      // App内, 调用 bridge
      options.debug && console.log('@bitverse.request request:', params)
      const response = await request(params)
      options.debug && console.log('@bridge.request reponse:', response)
      if (response?.status === 200) {
        if (response.body.retCode === 0) {
          return response.body.result
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
      // App外, xhr/axios
      return await axiosHttp.request(axiosOptions)
    }
  },
}

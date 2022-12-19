import axiosHttp from './axios'
import { request } from 'bitverse-jsbridge'
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
  enableJsBridgeRequest?: boolean
}

export default {
  async request(options: requestOptionType) {
    const { enableJsBridgeRequest = true, ...requestOpts } = options
    if (inBitverse && enableJsBridgeRequest) {
      // App内, 调用 bridge
      let response
      try {
        options.debug && console.log('@bitverse.request request:', options)
        response = await request(requestOpts)
        options.debug && console.log('@bridge.request reponse:', response)
        return {
          status: response?.status,
          headers: response?.headers,
          data: response?.body,
          requestImpl: 'jsbridge',
          errorCode: (response as unknown as any)?.errorCode,
          errorMessage: (response as unknown as any)?.errorMessage,
        }
      } catch (error) {
        return Promise.reject({
          status: response?.status,
          headers: response?.headers,
          data: response?.body,
          requestImpl: 'jsbridge',
        })
      }
    } else {
      // App外, xhr/axios
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
      const response = await axiosHttp.request(axiosOptions)
      return {
        requestImpl: 'axios',
        ...response,
      }
    }
  },
}

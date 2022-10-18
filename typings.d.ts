declare module '*.css'
declare module '*.less'

interface Window {}

import 'axios'
declare module 'axios' {
  export interface AxiosRequestConfig {
    debug?: boolean
  }
}

/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'

class ApiBuilder {
  baseURL = ''
  prefix = '/api'
  timeout = 1000 * 5

  setBaseURL(baseURL: string) {
    this.baseURL = baseURL
    return this
  }

  setPrefix(prefix: string) {
    this.prefix = prefix
    return this
  }

  setTimeout(timeout: number) {
    this.timeout = timeout
    return this
  }

  build(): Axios {
    const api = axios.create({
      baseURL: this.baseURL + this.prefix,
      timeout: this.timeout,
    })

    // Axios middleware to convert all api requests to snake_case
    api.interceptors.request.use((config: AxiosRequestConfig) => {
      const newConfig: any = { ...config }

      if (newConfig.headers['Content-Type'] === 'multipart/form-data') {
        return newConfig
      }
      if (config.params) {
        newConfig.params = decamelizeKeys(config.params)
      }
      if (config.data) {
        newConfig.data = decamelizeKeys(config.data)
      }

      logger.withTag('api').start('== url ===>>>>', newConfig.url)
      logger.withTag('api').start('== params ===>>>>', newConfig.params ?? {})
      return newConfig
    })

    // Axios middleware to convert all api responses to camelCase
    api.interceptors.response.use((response: AxiosResponse) => {
      const contentType: string = `${response.headers['content-type']}`
      if (
        response.data &&
        (contentType.includes('application/json') ||
          contentType.includes('application/x-www-form-urlencoded'))
      ) {
        response.data = camelizeKeys(response.data)
      }
      logger.withTag('api').success('== url ===>>>>', response.config.url)
      logger.withTag('api').success('== response ===>>>>', response.data)
      return response
    })

    return api
  }
}

export default ApiBuilder

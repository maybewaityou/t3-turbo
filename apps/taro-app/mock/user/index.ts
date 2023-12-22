/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { MockMethod } from 'vite-plugin-mock'
import { responseWrap } from '../_utils'

export default [
  {
    url: '/mock/api/user/zhangsan',
    method: 'get',
    response: () => responseWrap('zhangsan')
  }
] as MockMethod[]

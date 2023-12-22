/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import Mock from 'mockjs'
import { responseWrap } from './_utils'

const arr: any = []
for (let index = 0; index < 5; index++) {
  arr.push({
    customer_name: 'wade',
    status_text: '登录成功',
    os: 'Windows 10',
    browser: 'Chrome(99.0.4844.51)',
    ip: '192.168.9.110',
    created: '2021-12-14 10:41:02',
    location: '局域网 局域网'
  })
}

const logList = {
  total: 20,
  page: 1,
  page_size: arr.length,
  list: arr
}

const baseURL = 'http://climb2fame.com'

Mock.mock(`${baseURL}/mock/api/list`, 'get', () => responseWrap(logList))

import { queryMatch } from '@/extensions/query'
import { api } from '@/utils/trpc/client'
// import { queryMatch } from '@acme/tanstack'
import { UseQueryResult } from '@tanstack/react-query'
import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const statusResult = api.health.status.useQuery()
  const postResult = api.post.all.useQuery()

  return (
    <View className="index">
      {queryMatch(
        statusResult as UseQueryResult,
        () => (
          <></>
        ),
        (err) => (
          <View>Failed to load {err.message}</View>
        ),
        (data) => (
          <>{JSON.stringify(data)}</>
        ),
      )}
      {queryMatch(
        postResult as UseQueryResult,
        () => (
          <></>
        ),
        (err) => (
          <View>Failed to load {err.message}</View>
        ),
        (data) => (
          <>{JSON.stringify(data)}</>
        ),
      )}
    </View>
  )
}

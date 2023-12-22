import { api } from '@/utils/trpc/client'
import { queryMatch } from '@acme/tanstack'
import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const statusResult = api.health.status.useQuery()
  queryMatch<{ status: string }>(
    statusResult,
    () => <></>,
    (err) => <View>Failed to load {err.message}</View>,
    (data) => <>{JSON.stringify(data)}</>,
  )

  const postResult = api.post.all.useQuery()
  queryMatch(
    postResult,
    () => <></>,
    (err) => <View>Failed to load {err.message}</View>,
    (data) => <>{JSON.stringify(data)}</>,
  )

  return (
    <View className="index">
      <Text>Hello world!</Text>
    </View>
  )
}

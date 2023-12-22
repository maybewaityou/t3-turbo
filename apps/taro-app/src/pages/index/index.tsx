import { api } from '@/utils/trpc/client'
import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const { data, isError, error } = api.health.status.useQuery()
  if (isError) return <View>Failed to load {error.message}</View>
  console.log('data', data)

  // const { data: posts } = api.post.all.useQuery()
  // console.log('posts', posts)

  return (
    <View className="index">
      <Text>Hello world!</Text>
    </View>
  )
}

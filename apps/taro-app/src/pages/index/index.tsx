import { api } from '@/utils/trpc/client'
import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const { data } = api.health.status.useQuery()
  console.log('data', data)

  const { data: posts } = api.post.all.useQuery()
  console.log(posts)

  return (
    <View className="index">
      <Text>Hello world!</Text>
    </View>
  )
}

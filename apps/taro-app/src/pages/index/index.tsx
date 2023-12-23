import { api } from '@/utils/trpc/client'
import { Button, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const statusResult = api.health.status.useQuery()
  const postResult = api.post.all.useQuery()
  const { mutateAsync } = api.post.test.useMutation()
  async function handleClick() {
    const result = await toE(mutateAsync({ text: 'hello' }))
    console.log(result)
  }

  return (
    <View className="index">
      <Button onClick={handleClick}>button</Button>
      {queryMatch(
        statusResult,
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
        postResult,
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

import { api } from "@/utils/trpc/client";
import { Button, Text, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const statusResult = api.health.status.useQuery();
  const postResult = api.post.all.useQuery();
  const { mutateAsync } = api.post.test.useMutation();
  async function handleClick() {
    const result = await toE(mutateAsync({ text: "hello" }));
    match(
      result,
      (err) => console.log("err", err),
      (data) => console.log("data", data),
    );
  }

  return (
    <View className="flex flex-col items-center">
      <Text className="text-3xl">Hello World</Text>
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
          <>
            {data.map((item) => (
              <View key={item.id}>
                <Text>{item.title}</Text>
              </View>
            ))}
          </>
        ),
      )}
    </View>
  );
}

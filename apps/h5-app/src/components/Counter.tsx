/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

interface CounterProps {
  count: number
  title: string
}

export default function Counter(props: CounterProps) {
  return (
    <>
      <h1 className="text-3xl">{props.title}</h1>
      <h2 className="text-3xl">{props.count}</h2>
    </>
  )
}

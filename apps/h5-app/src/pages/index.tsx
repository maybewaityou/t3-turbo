/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { Button } from 'antd-mobile'
import { AntOutline } from 'antd-mobile-icons'

import Counter from '@/components/Counter'
import Square from '@/components/Square'
import type { ListStore } from '@/stores/index.d'
import { api } from '@/utils/trpc/client'

function App() {
  const navigate = useNavigate()
  function handleClick() {
    navigate('/test')
  }

  const { state, request } = useListStore<ListStore>((state: any) => state)
  console.log('== state ===>>>>', state)

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-prefers-color-scheme', 'dark')
  }, [])
  // const resultComponent = when(
  //   state,
  //   () => <div>loading</div>,
  //   (error) => <div>error: {JSON.stringify(error)}</div>,
  //   (data) => <div>data: {JSON.stringify(data)}</div>
  // )
  const { t } = useTranslation()

  const { data } = api.health.status.useQuery()
  console.log('== data ===>>>>', data)

  return (
    <div className="flex flex-col items-center justify-center">
      <AntOutline fontSize={24} />
      <Square />
      <Counter title={t('home.text')} count={state.data.total} />
      {state.when(
        () => (
          <div>loading</div>
        ),
        (error) => (
          <div>error: {JSON.stringify(error)}</div>
        ),
        (data) => (
          <div>data: {data.pageSize}</div>
        ),
      )}
      <div>
        <Button color="primary" onClick={request}>
          request
        </Button>
      </div>
      <div>
        <Button color="primary" onClick={handleClick}>
          test
        </Button>
      </div>
    </div>
  )
}

export default App

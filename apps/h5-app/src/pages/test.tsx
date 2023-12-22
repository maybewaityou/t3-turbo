/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { Button } from 'antd-mobile'

import Counter from '@/components/Counter'

export default function Page() {
  const navigate = useNavigate()
  function handleClick() {
    navigate('/')
  }
  const {
    state: { data, loading, error },
  } = useListStore((state) => state)
  console.log('== loading ===>>>>', loading)
  console.log('== error ===>>>>', error)
  console.log('== data ===>>>>', data)
  const { t } = useTranslation()
  return (
    <div>
      <Counter title={t('test.text')} count={data.pageSize} />
      <div>
        <Button color="primary" onClick={handleClick}>
          test
        </Button>
      </div>
    </div>
  )
}

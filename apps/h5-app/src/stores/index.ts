/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import type { ListData, ListStore } from './index.d'
import { middleware } from './middleware'
import { RequestStateWrapper, requestAction } from './model'

const defaultData: ListData = {
  total: 0,
  page: 1,
  pageSize: 10,
  list: [],
}

const defaultState = new RequestStateWrapper({
  loading: false,
  error: null,
  data: defaultData,
})

export const useListStore = create<ListStore>()(
  middleware((set) => ({
    state: {
      ...defaultState,
      when: defaultState.when,
    },
    request: () => {
      requestAction(set)(defaultData)(() => {
        return retryE<ListData>(getListApi)
      })
    },
  })),
)

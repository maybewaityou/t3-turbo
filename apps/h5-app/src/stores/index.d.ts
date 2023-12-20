/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export type ListData = {
  readonly total: number
  readonly page: number
  readonly pageSize: number
  readonly list: []
}

export interface ListStore {
  readonly state: RequestState<ListData>
  readonly request: () => void
}

export interface RequestStoreState<T> {
  loading: boolean
  error: Error | null
  data: T
}

export type loadingRenderFunc = () => ReactElement
export type errorRenderFunc = (error: Error) => ReactElement
export type dataRenderFunc<T> = (data: T) => ReactElement

export interface RequestState<T> extends RequestStoreState<T> {
  when: (
    loading: loadingRenderFunc,
    error: errorRenderFunc,
    data: dataRenderFunc<T>,
  ) => ReactElement
}

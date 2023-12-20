/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { Either } from 'fp-ts/Either'

import { match } from '@/extensions/fp'
import { ReactElement } from 'react'
import type { RequestState, RequestStoreState } from './index.d'
import { failure, ok, reset } from './utils'

export class RequestStateWrapper<T> implements RequestState<T> {
  loading: boolean = false
  error: Error | null = null
  data: T

  constructor(initialState: RequestStoreState<T>) {
    this.loading = initialState.loading
    this.error = initialState.error
    this.data = initialState.data
  }

  reset(data: T) {
    this.loading = true
    this.error = null
    this.data = data
  }

  failure(error: Error) {
    this.loading = false
    this.error = error
  }

  ok(data: T) {
    this.loading = false
    this.data = data
  }

  when(
    loading: () => ReactElement,
    error: (error: Error) => ReactElement,
    data: (data: T) => ReactElement,
  ): ReactElement {
    // render loading component
    if (this.loading) return loading()

    // render component with error
    if (this.error) return error(this.error)

    // render component with data
    if (this.data) return data(this.data)

    return data({} as any)
  }
}

export function requestAction<T>(set: (state: any) => void) {
  return (defaultData: T) => async (fn: () => Promise<Either<Error, T>>) => {
    set((draft: any) => reset(draft.state, defaultData))
    const result = await fn()
    match(
      result,
      (error) => set((draft: any) => failure(draft.state, error)),
      (data) => set((draft: any) => ok(draft.state, data)),
    )
  }
}

export function when<T>(
  state: RequestState<T>,
  loading: () => ReactElement,
  error: (error: Error) => ReactElement,
  data: (data: T) => ReactElement,
): ReactElement {
  return state.when(loading, error, data)
}

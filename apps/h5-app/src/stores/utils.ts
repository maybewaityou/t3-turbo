/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import type { RequestStoreState } from './index.d'

export function reset<T>(state: RequestStoreState<T>, data: T) {
  state.loading = true
  state.error = null
  state.data = data
}

export function failure<T>(state: RequestStoreState<T>, error: Error) {
  state.loading = false
  state.error = error
}

export function ok<T>(state: RequestStoreState<T>, data: T) {
  state.loading = false
  state.data = data
}

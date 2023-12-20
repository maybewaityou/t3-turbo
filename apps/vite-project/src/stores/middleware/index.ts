/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { storeLogger as logger } from './logger'

export type ZustandImmer = [['zustand/immer', never]]

export type ZustandDevtools = [['zustand/devtools', never]]

export const middleware = <T>(fn: StateCreator<T, ZustandImmer>, name = 'stores') =>
  logger(immer<T>(fn), name)

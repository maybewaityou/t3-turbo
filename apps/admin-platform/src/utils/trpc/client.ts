/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '@acme/api';

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from '@acme/api';

const { REACT_APP_ENV } = process.env;

export const getBaseUrl = () => {
  if (REACT_APP_ENV !== 'dev') return '';

  return `http://localhost:8080`;
};

/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en/index.json'
import zhHans from './zh-Hans/index.json'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en,
      'zh-Hans': zhHans,
    },
    lng: 'zh-Hans',
    fallbackLng: 'zh-Hans',
    interpolation: {
      escapeValue: false,
    },
  })

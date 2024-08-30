import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { LANG } from '@shared/constants/languages.ts'

import { ENG_TRANSLATE } from './copies/eng.ts'
import { UKR_TRANSLATE } from './copies/ukr.ts'

const resources = {
	[LANG.UKR]: {
		translation: UKR_TRANSLATE
	},
	[LANG.EN]: {
		translation: ENG_TRANSLATE
	}
}

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		resources,
		fallbackLng: LANG.UKR,

		interpolation: {
			escapeValue: false
		}
	})

export default i18n

import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'

import enMessages from '../i18n/en.json'
import frMessages from '../i18n/fr.json'

addLocaleData([...en, ...fr])

export const appLocales = [
  'en',
  'fr',
]

export const formatTranslationMessages = (messages) => {
  const formattedMessages = {}
  for (const message of messages) {
    formattedMessages[message.id] = message.message || message.defaultMessage
  }
  return formattedMessages
}

export const messages = {
  'en' : formatTranslationMessages(enMessages),
  'fr' : formatTranslationMessages(frMessages)
}

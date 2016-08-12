import { TAPi18n } from 'meteor/tap:i18n'


const localeFromBrowser = window.navigator.userLanguage || window.navigator.language;

switchToLocale()

// TODO : remove ugly and unreliable timeout...
setTimeout(switchToLocale,1000);

function switchToLocale() {

  // Setup language, try setting by browser (default en)
  let locale = 'en';

  if (localeFromBrowser.match(/en/)) locale = 'en'
  if (localeFromBrowser.match(/fr/)) locale = 'fr'

  TAPi18n.setLanguage(locale)
}

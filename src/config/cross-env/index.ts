import { Map } from 'immutable';

export default {
  locales: Map({
    en: 'en',
    vi: 'vi',
  }),

  env: Map({
    production: 'production',
    development: 'development',
    test: 'test',
  }),

  // Regex
  regex: Map({
    objectId: /^[0-9a-fA-F]{24}$/,
    phone: /^\+?1?(\d{10,12}$)/,
    email: /\S+@\S+\.\S+/,
    appId: /[a-zA-Z0-9._]{2,32}/,
    name: /[a-zA-Z0-9\s]{2,64}/,
  }),


  // Format
  format: Map({
    date: 'DD/MM/YYYY, HH:mm',
    dateWithDayAndMonth: 'DD/MM',
  }),

  limit: Map({
    limit20: 20,
  }),
}

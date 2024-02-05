const path = require('path');

function getLocalePath() {
  return typeof window === 'undefined'
    ? path.resolve('./public/locales')
    : '/locales';
}

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['de', 'en'],
  },
  localePath: getLocalePath(),
  react: { useSuspense: false },
};

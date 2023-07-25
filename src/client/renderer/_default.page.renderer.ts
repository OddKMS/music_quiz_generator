// TODO: Add locale here
// function onBeforeRoute(pageContext) {
//   return {
//     pageContext: {
//       // We make `locale` available as `pageContext.locale`
//       locale,
//       // We overwrite `pageContext.urlOriginal`
//       urlOriginal: urlWithoutLocale
//     }
//   }
// }

// // We can also use a library instead of implementing our own locale retrieval mechanism
// function extractLocale(url) {
//   // We determine the locale, for example:
//   //  extractLocale('/en-US/film/42').locale === 'en-US'
//   //  extractLocale('/de-DE/film/42').locale === 'de-DE'
//   const locale = 'en-GB'

//   // We remove the locale, for example:
//   //  extractLocale('/en-US/film/42').urlWithoutLocale === '/film/42'
//   //  extractLocale('/de-DE/film/42').urlWithoutLocale === '/film/42'
//   //  ...
//   urlWithoutLocale = /* ... */

//   return { locale, urlWithoutLocale }
// }

// export { onBeforeRoute }

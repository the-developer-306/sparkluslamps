/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 186:
/***/ (() => {

// extracted by mini-css-extract-plugin


/***/ }),

/***/ 776:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(355);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(619);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(186);



function overrideCoreDocumentationLinksToWpcom(translation, text) {
  switch (text) {
    case 'https://wordpress.org/support/article/excerpt/':
    case 'https://wordpress.org/support/article/settings-sidebar/#excerpt':
    case 'https://wordpress.org/documentation/article/page-post-settings-sidebar/#excerpt':
      return (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_2__/* .localizeUrl */ .rm)('https://wordpress.com/support/excerpts/', window.wpcomDocumentationLinksLocale);
    case 'https://wordpress.org/support/article/writing-posts/#post-field-descriptions':
    case 'https://wordpress.org/support/article/settings-sidebar/#permalink':
    case 'https://wordpress.org/documentation/article/page-post-settings-sidebar/#permalink':
      return (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_2__/* .localizeUrl */ .rm)('https://wordpress.com/support/permalinks-and-slugs/', window.wpcomDocumentationLinksLocale);
    case 'https://wordpress.org/support/article/wordpress-editor/':
      return (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_2__/* .localizeUrl */ .rm)('https://wordpress.com/support/wordpress-editor/', window.wpcomDocumentationLinksLocale);
    case 'https://wordpress.org/support/article/site-editor/':
      return (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_2__/* .localizeUrl */ .rm)('https://wordpress.com/support/site-editor/', window.wpcomDocumentationLinksLocale);
    case 'https://wordpress.org/support/article/block-based-widgets-editor/':
      return (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_2__/* .localizeUrl */ .rm)('https://wordpress.com/support/widgets/', window.wpcomDocumentationLinksLocale);
    case 'https://wordpress.org/plugins/classic-widgets/':
      return (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_2__/* .localizeUrl */ .rm)('https://wordpress.com/plugins/classic-widgets', window.wpcomDocumentationLinksLocale);
    case 'https://wordpress.org/support/article/styles-overview/':
      return (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_2__/* .localizeUrl */ .rm)('https://wordpress.com/support/using-styles/', window.wpcomDocumentationLinksLocale);
  }
  return translation;
}
function hideSimpleSiteTranslations(translation, text) {
  switch (text) {
    case 'https://wordpress.org/plugins/classic-widgets/':
      return '';
    case 'Want to stick with the old widgets?':
      return '';
    case 'Get the Classic Widgets plugin.':
      return '';
  }
  return translation;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('i18n.gettext_default', 'full-site-editing/override-core-docs-to-wpcom', overrideCoreDocumentationLinksToWpcom, 9);
if (window?._currentSiteType === 'simple') {
  (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('i18n.gettext_default', 'full-site-editing/override-core-docs-to-wpcom', hideSimpleSiteTranslations, 10);
}

/***/ }),

/***/ 706:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ym: () => (/* binding */ useLocale),
/* harmony export */   t: () => (/* binding */ getWpI18nLocaleSlug)
/* harmony export */ });
/* unused harmony exports localeContext, LocaleProvider, withLocale, useIsEnglishLocale, useHasEnTranslation */
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(491);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);






const localeContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_3__.createContext)(null);
const LocaleProvider = ({
  children,
  localeSlug
}) => createElement(localeContext.Provider, {
  value: localeSlug
}, children);

/**
 * Returns locale slug
 * @param {string} locale locale to be converted e.g. "en_US".
 * @returns locale string e.g. "en"
 */
function mapWpI18nLangToLocaleSlug(locale = '') {
  if (!locale) {
    return '';
  }
  const TARGET_LOCALES = ['pt_br', 'pt-br', 'zh_tw', 'zh-tw', 'zh_cn', 'zh-cn', 'zh_sg', 'zh-sg'];
  const lowerCaseLocale = locale.toLowerCase();
  const formattedLocale = TARGET_LOCALES.includes(lowerCaseLocale) ? lowerCaseLocale.replace('_', '-') : lowerCaseLocale.replace(/([-_].*)$/i, '');
  return formattedLocale || 'en';
}

/**
 * Get the lang from the @wordpress/i18n locale data
 * @returns lang e.g. "en_US"
 */
function getWpI18nLocaleLang() {
  const localeData = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.getLocaleData() || {};
  return localeData['']?.lang || localeData['']?.language || '';
}

/**
 * Get the lang from the @wordpress/i18n locale data and map the value to the locale slug
 * @returns lang e.g. "en", "pt-br", "zh-tw"
 */
function getWpI18nLocaleSlug() {
  const language = getWpI18nLocaleLang();
  return mapWpI18nLangToLocaleSlug(language);
}

/**
 * React hook providing the current locale slug. If `<LocaleProvider>` hasn't
 * been defined in the component tree then it will fall back to using the
 * data from `@wordpress/i18n` to determine the current locale slug.
 * @example
 *
 * import { useLocale } from '@automattic/i18n-utils';
 * function MyComponent() {
 *   const locale = useLocale();
 *   return <div>The current locale is: { locale }</div>;
 * }
 */
function useLocale() {
  const fromProvider = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(localeContext);
  const providerHasLocale = !!fromProvider;
  const [fromWpI18n, setWpLocale] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(getWpI18nLocaleSlug());
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    // If the <LocaleProvider> has been used further up the component tree
    // then we don't want to subscribe to any defaultI18n changes.
    if (providerHasLocale) {
      return;
    }
    setWpLocale(getWpI18nLocaleSlug());
    return _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.subscribe(() => {
      setWpLocale(getWpI18nLocaleSlug());
    });
  }, [providerHasLocale]);
  return fromProvider || fromWpI18n ||  true && window._currentUserLocale || 'en';
}

/**
 * HoC providing the current locale slug supplied to `<LocaleProvider>`.
 * @param InnerComponent Component that will receive `locale` as a prop
 * @returns Component enhanced with locale
 * @example
 *
 * import { withLocale } from '@automattic/i18n-utils';
 * function MyComponent( { locale } ) {
 *   return <div>The current locale is: { locale }</div>;
 * }
 * export default withLocale( MyComponent );
 */
const withLocale = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.createHigherOrderComponent)(InnerComponent => {
  return props => {
    const locale = useLocale();
    const innerProps = {
      ...props,
      locale
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerComponent, innerProps);
  };
}, 'withLocale');

/**
 * React hook providing whether the current locale slug belongs to English or not
 * @example
 *
 * import { useIsEnglishLocale } from '@automattic/i18n-utils';
 * function MyComponent() {
 *   const isEnglishLocale = useIsEnglishLocale();
 *   return <div>The current locale is English: { isEnglishLocale }</div>;
 * }
 */
function useIsEnglishLocale() {
  const locale = useLocale();
  return englishLocales.includes(locale);
}
function useHasEnTranslation() {
  const isEnglishLocale = useIsEnglishLocale();
  return useCallback((...args) => isEnglishLocale || i18n.hasTranslation(...args), [isEnglishLocale]);
}

/***/ }),

/***/ 903:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BS: () => (/* binding */ forumLocales),
/* harmony export */   Cx: () => (/* binding */ localesWithGoBlog),
/* harmony export */   K8: () => (/* binding */ localesWithCookiePolicy),
/* harmony export */   S9: () => (/* binding */ localesWithPrivacyPolicy),
/* harmony export */   Sc: () => (/* binding */ localesWithBlog),
/* harmony export */   Sj: () => (/* binding */ localesToSubdomains),
/* harmony export */   Ws: () => (/* binding */ localesForPricePlans),
/* harmony export */   _J: () => (/* binding */ supportSiteLocales),
/* harmony export */   lW: () => (/* binding */ magnificentNonEnLocales),
/* harmony export */   mt: () => (/* binding */ localesWithLearn),
/* harmony export */   rh: () => (/* binding */ jetpackComLocales)
/* harmony export */ });
/* unused harmony exports i18nDefaultLocaleSlug, englishLocales, livechatSupportLocales */
/**
 * The locale sets here map roughly to those found in locales.php
 *
 * todo: move these into @automattic/languages as another downloaded resource
 * todo: cleanup _shared.json - replace references to the below config options with imports from here
 */

const i18nDefaultLocaleSlug = 'en';
const localesWithBlog = ['en', 'ja', 'es', 'pt', 'fr', 'pt-br'];
const localesWithGoBlog = ['en', 'pt-br', 'de', 'es', 'fr', 'it'];
const localesWithPrivacyPolicy = ['en', 'fr', 'de', 'es'];
const localesWithCookiePolicy = ['en', 'fr', 'de', 'es'];
const localesWithLearn = ['en', 'es'];
const localesForPricePlans = ['ar', 'de', 'el', 'es', 'fr', 'he', 'id', 'it', 'ja', 'ko', 'nl', 'pt-br', 'ro', 'ru', 'sv', 'tr', 'zh-cn', 'zh-tw'];
const localesToSubdomains = {
  'pt-br': 'br',
  br: 'bre',
  zh: 'zh-cn',
  'zh-hk': 'zh-tw',
  'zh-sg': 'zh-cn',
  kr: 'ko'
};

// replaces config( 'english_locales' )
const englishLocales = (/* unused pure expression or super */ null && (['en', 'en-gb']));

// replaces config( 'livechat_support_locales' )
const livechatSupportLocales = (/* unused pure expression or super */ null && (['en']));

// replaces config( 'support_site_locales' )
const supportSiteLocales = ['ar', 'de', 'en', 'es', 'fr', 'he', 'id', 'it', 'ja', 'ko', 'nl', 'pt-br', 'ru', 'sv', 'tr', 'zh-cn', 'zh-tw'];

// replaces config( 'forum_locales')
const forumLocales = ['ar', 'de', 'el', 'en', 'es', 'fa', 'fi', 'fr', 'id', 'it', 'ja', 'nl', 'pt', 'pt-br', 'ru', 'sv', 'th', 'tl', 'tr'];

// replaces config( 'magnificent_non_en_locales')
const magnificentNonEnLocales = ['es', 'pt-br', 'de', 'fr', 'he', 'ja', 'it', 'nl', 'ru', 'tr', 'id', 'zh-cn', 'zh-tw', 'ko', 'ar', 'sv'];

// replaces config( 'jetpack_com_locales')
const jetpackComLocales = ['en', 'ar', 'de', 'es', 'fr', 'he', 'id', 'it', 'ja', 'ko', 'nl', 'pt-br', 'ro', 'ru', 'sv', 'tr', 'zh-cn', 'zh-tw'];

/***/ }),

/***/ 355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rm: () => (/* binding */ localizeUrl)
/* harmony export */ });
/* unused harmony exports urlLocalizationMapping, useLocalizeUrl, withLocalizeUrl */
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(491);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _locale_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(706);
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(903);





const INVALID_URL = `http://__domain__.invalid`;
function getDefaultLocale() {
  return (0,_locale_context__WEBPACK_IMPORTED_MODULE_3__/* .getWpI18nLocaleSlug */ .t)() ?? 'en';
}
const setLocalizedUrlHost = (hostname, validLocales = []) => (url, locale) => {
  if (validLocales.includes(locale) && locale !== 'en') {
    // Avoid changing the hostname when the locale is set via the path.
    if (url.pathname.substr(0, locale.length + 2) !== '/' + locale + '/') {
      url.host = `${_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesToSubdomains */ .Sj[locale] || locale}.${hostname}`;
    }
  }
  return url;
};
const setLocalizedWpComPath = (prefix, validLocales = [], limitPathMatch = null) => (url, localeSlug) => {
  url.host = 'wordpress.com';
  if (typeof limitPathMatch === 'object' && limitPathMatch instanceof RegExp && !limitPathMatch.test(url.pathname)) {
    validLocales = []; // only rewrite to English.
  }
  url.pathname = prefix + url.pathname;
  if (validLocales.includes(localeSlug) && localeSlug !== 'en') {
    url.pathname = localeSlug + url.pathname;
  }
  return url;
};
const prefixOrSuffixLocalizedUrlPath = (validLocales = [], limitPathMatch = null, prefixOrSuffix) => (url, localeSlug) => {
  if (typeof limitPathMatch === 'object' && limitPathMatch instanceof RegExp) {
    if (!limitPathMatch.test(url.pathname)) {
      return url; // No rewriting if not matches the path.
    }
  }
  if (!validLocales.includes(localeSlug) || localeSlug === 'en') {
    return url;
  }
  if (prefixOrSuffix === 'prefix') {
    url.pathname = localeSlug + url.pathname;
  } else if (prefixOrSuffix === 'suffix') {
    // Make sure there's a slash between the path and the locale. Plus, if
    // the path has a trailing slash, add one after the suffix too.
    if (url.pathname.endsWith('/')) {
      url.pathname += localeSlug + '/';
    } else {
      url.pathname += '/' + localeSlug;
    }
  }
  return url;
};
const prefixLocalizedUrlPath = (validLocales = [], limitPathMatch = null) => (url, localeSlug) => {
  return prefixOrSuffixLocalizedUrlPath(validLocales, limitPathMatch, 'prefix')(url, localeSlug);
};
const suffixLocalizedUrlPath = (validLocales = [], limitPathMatch = null) => (url, localeSlug) => {
  return prefixOrSuffixLocalizedUrlPath(validLocales, limitPathMatch, 'suffix')(url, localeSlug);
};
const urlLocalizationMapping = {
  'wordpress.com/support/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .supportSiteLocales */ ._J),
  'wordpress.com/forums/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .forumLocales */ .BS),
  'wordpress.com/blog/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithBlog */ .Sc, /^\/blog\/?$/),
  'wordpress.com/go/': (url, localeSlug) => {
    // Rewrite non-home URLs (e.g. posts) only for Spanish, because that's
    // the only language into which we're currently translating content.
    const isHome = ['/go/', '/go'].includes(url.pathname);
    if (!isHome && 'es' !== localeSlug) {
      return url;
    }
    return prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithGoBlog */ .Cx)(url, localeSlug);
  },
  'wordpress.com/pricing/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesForPricePlans */ .Ws),
  'wordpress.com/tos/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW),
  'wordpress.com/wp-admin/': setLocalizedUrlHost('wordpress.com', _locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW),
  'wordpress.com/wp-login.php': setLocalizedUrlHost('wordpress.com', _locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW),
  'jetpack.com': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .jetpackComLocales */ .rh),
  'cloud.jetpack.com': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .jetpackComLocales */ .rh),
  'en.support.wordpress.com': setLocalizedWpComPath('/support', _locales__WEBPACK_IMPORTED_MODULE_4__/* .supportSiteLocales */ ._J),
  'en.blog.wordpress.com': setLocalizedWpComPath('/blog', _locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithBlog */ .Sc, /^\/$/),
  'apps.wordpress.com': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW),
  'en.forums.wordpress.com': setLocalizedWpComPath('/forums', _locales__WEBPACK_IMPORTED_MODULE_4__/* .forumLocales */ .BS),
  'automattic.com/privacy/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithPrivacyPolicy */ .S9),
  'automattic.com/cookies/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithCookiePolicy */ .K8),
  'wordpress.com/help/contact/': (url, localeSlug, isLoggedIn) => {
    if (isLoggedIn) {
      return url;
    }
    url.pathname = url.pathname.replace(/\/help\//, '/support/');
    return prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .supportSiteLocales */ ._J)(url, localeSlug);
  },
  'wordpress.com': (url, localeSlug) => {
    // Don't rewrite checkout and me URLs.
    if (/^\/(checkout|me)(\/|$)/.test(url.pathname)) {
      return url;
    }
    // Don't rewrite Calypso URLs that have the URL at the end.
    if (/\/([a-z0-9-]+\.)+[a-z]{2,}\/?$/.test(url.pathname)) {
      return url;
    }
    return prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/theme/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/themes/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/plugins/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/log-in/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : suffixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/start/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : suffixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/learn/': (url, localeSlug) => {
    const webinars = url.pathname.includes('/learn/webinars/');
    if (webinars && 'es' === localeSlug) {
      url.pathname = url.pathname.replace('/learn/webinars/', '/learn/es/webinars/');
      return url;
    }
    return suffixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithLearn */ .mt)(url, localeSlug);
  },
  'wordpress.com/plans/': (url, localeSlug, isLoggedIn) => {
    // if logged in, or url.pathname contains characters after `/plans/`, don't rewrite
    return isLoggedIn || url.pathname !== '/plans/' ? url : prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesForPricePlans */ .Ws)(url, localeSlug);
  },
  'wordpress.com/setup/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : suffixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  }
};
function hasTrailingSlash(urlString) {
  try {
    const url = new URL(String(urlString), INVALID_URL);
    return url.pathname.endsWith('/');
  } catch (e) {
    return false;
  }
}
function localizeUrl(fullUrl, locale = getDefaultLocale(), isLoggedIn = true, preserveTrailingSlashVariation = false) {
  let url;
  try {
    url = new URL(String(fullUrl), INVALID_URL);
  } catch (e) {
    return fullUrl;
  }

  // Ignore and passthrough /relative/urls that have no host specified
  if (url.origin === INVALID_URL) {
    return fullUrl;
  }

  // Let's unify the URL.
  url.protocol = 'https:';
  if (!url.pathname.endsWith('.php')) {
    // Essentially a trailingslashit.
    // We need to do this because the matching list is standardised to use
    // trailing slashes everywhere.
    // However, if the `preserveTrailingSlashVariation` option is enabled, we
    // remove the trailing slash at the end again, when appropriate.
    url.pathname = (url.pathname + '/').replace(/\/+$/, '/');
  }
  const firstPathSegment = url.pathname.substr(0, 1 + url.pathname.indexOf('/', 1));
  if ('en.wordpress.com' === url.host) {
    url.host = 'wordpress.com';
  }
  if ('/' + locale + '/' === firstPathSegment) {
    return fullUrl;
  }

  // Lookup is checked back to front.
  const lookup = [url.host, url.host + firstPathSegment, url.host + url.pathname];
  for (let i = lookup.length - 1; i >= 0; i--) {
    if (lookup[i] in urlLocalizationMapping) {
      const mapped = urlLocalizationMapping[lookup[i]](url, locale, isLoggedIn).href;
      if (!preserveTrailingSlashVariation) {
        return mapped;
      }
      try {
        const mappedUrl = new URL(mapped);
        if (!hasTrailingSlash(fullUrl)) {
          mappedUrl.pathname = mappedUrl.pathname.replace(/\/+$/, '');
        }
        return mappedUrl.href;
      } catch {
        return mapped;
      }
    }
  }

  // Nothing needed to be changed, just return it unmodified.
  return fullUrl;
}
function useLocalizeUrl() {
  const providerLocale = (0,_locale_context__WEBPACK_IMPORTED_MODULE_3__/* .useLocale */ .Ym)();
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((fullUrl, locale, isLoggedIn, preserveTrailingSlashVariation) => {
    if (locale) {
      return localizeUrl(fullUrl, locale, isLoggedIn, preserveTrailingSlashVariation);
    }
    return localizeUrl(fullUrl, providerLocale, isLoggedIn, preserveTrailingSlashVariation);
  }, [providerLocale]);
}
const withLocalizeUrl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.createHigherOrderComponent)(InnerComponent => {
  return props => {
    const localizeUrl = useLocalizeUrl();
    const innerProps = {
      ...props,
      localizeUrl
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerComponent, innerProps);
  };
}, 'withLocalizeUrl');

/***/ }),

/***/ 609:
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ 491:
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ 87:
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ 619:
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ 723:
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(776);

})();

window.EditingToolkit = __webpack_exports__;
/******/ })()
;
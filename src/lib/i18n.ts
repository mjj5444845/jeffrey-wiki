export type Lang = 'en'

export const i18n = {
  en: {
    search: 'Search',
    searchPlaceholder: 'Search…',
    tabRead: 'Read',
    tabMessage: 'Contact',
    tabHistory: 'View history',
    tocTitle: 'Contents',
    tocHide: 'hide',
    tocShow: 'show',
    lastModified: 'This page was last modified on',
    categories: 'Categories:',
    navNavigation: 'Navigation',
    navPages: 'Pages',
    navMainPage: 'Main page',
    footerAbout: 'About',
    footerAllPages: 'All pages',
  },
} as const

export type I18n = Record<keyof typeof i18n.en, string>

export type Lang = 'en'

export const i18n = {
  en: {
    search: 'Search',
    searchPlaceholder: 'Search…',
    tabRead: 'Read',
    tabMessage: 'Message',
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
    footerText: 'Junjie Ma · George Mason University · Built with Next.js + Markdown',
    msgPageTitle: 'Send a Message',
    msgTitleLabel: 'Title',
    msgTextLabel: 'Message',
    msgSendBtn: 'Send',
    msgNote: 'Clicking Send will open a GitHub issue form in a new tab. A GitHub account is required.',
  },
} as const

export type I18n = Record<keyof typeof i18n.en, string>

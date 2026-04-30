export interface InfoboxField {
  label: string
  value: string
}

export interface InfoboxData {
  title?: string
  image?: string
  imageCaption?: string
  fields: InfoboxField[]
}

export interface HeadingItem {
  id: string
  text: string
  level: 2 | 3
}

export interface WikiFrontMatter {
  title: string
  description?: string
  tags?: string[]
  infobox?: {
    title?: string
    image?: string
    imageCaption?: string
    [key: string]: string | undefined
  }
}

export interface WikiPageZh {
  title: string
  description?: string
  infobox?: InfoboxData
  headings: HeadingItem[]
  content: string
}

export interface WikiPage {
  slug: string
  title: string
  description?: string
  tags?: string[]
  infobox?: InfoboxData
  headings: HeadingItem[]
  content: string
  lastModified?: string
  zh?: WikiPageZh
}

export interface WikiPageMeta {
  slug: string
  title: string
  description?: string
  tags?: string[]
}

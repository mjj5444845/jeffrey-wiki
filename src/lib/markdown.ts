import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import type { Root, Element, Text } from 'hast'
import type { Plugin } from 'unified'
import remarkWikiLinks, { slugify } from './wikilinks'
import type { WikiFrontMatter, WikiPage, InfoboxData, InfoboxField, HeadingItem } from '@/types/wiki'

function hastText(node: Element): string {
  let out = ''
  for (const child of node.children) {
    if (child.type === 'text') out += (child as Text).value
    else if (child.type === 'element') out += hastText(child as Element)
  }
  return out
}

function rehypeExtractHeadings(sink: HeadingItem[]): Plugin<[], Root> {
  return () => (tree: Root) => {
    visit(tree, 'element', (node) => {
      const el = node as Element
      if (el.tagName !== 'h2' && el.tagName !== 'h3') return
      sink.push({
        id: (el.properties?.id as string) || '',
        text: hastText(el),
        level: parseInt(el.tagName[1]) as 2 | 3,
      })
    })
  }
}

function parseInfobox(raw: WikiFrontMatter['infobox']): InfoboxData | undefined {
  if (!raw) return undefined
  const reserved = new Set(['title', 'image', 'imageCaption'])
  const fields: InfoboxField[] = Object.entries(raw)
    .filter(([key, val]) => !reserved.has(key) && val !== undefined)
    .map(([key, val]) => ({
      label: key.replace(/([A-Z])/g, ' $1').trim(),
      value: String(val),
    }))
  return { title: raw.title, image: raw.image, imageCaption: raw.imageCaption, fields }
}

async function buildHtml(source: string): Promise<{ html: string; headings: HeadingItem[]; fm: WikiFrontMatter }> {
  const { data, content } = matter(source)
  const fm = data as WikiFrontMatter
  const headings: HeadingItem[] = []

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkWikiLinks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeExtractHeadings(headings))
    .use(rehypeStringify)

  const html = String(await processor.process(content))
  return { html, headings, fm }
}

export async function processMarkdown(source: string, slug: string): Promise<WikiPage> {
  const { html, headings, fm } = await buildHtml(source)
  return {
    slug,
    title: fm.title || slug,
    description: fm.description,
    tags: fm.tags,
    infobox: parseInfobox(fm.infobox),
    headings,
    content: html,
  }
}

export { slugify }

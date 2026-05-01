import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { processMarkdown, slugify } from './markdown'
import type { WikiPage, WikiPageMeta, WikiFrontMatter } from '@/types/wiki'

const WIKI_DIR = path.join(process.cwd(), 'content', 'wiki')

export function getAllSlugs(): string[] {
  if (!fs.existsSync(WIKI_DIR)) return []
  return fs
    .readdirSync(WIKI_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getAllPagesMeta(): WikiPageMeta[] {
  return getAllSlugs().map((slug) => {
    const source = fs.readFileSync(path.join(WIKI_DIR, `${slug}.md`), 'utf-8')
    const { data } = matter(source)
    const fm = data as WikiFrontMatter
    return { slug, title: fm.title || slug, description: fm.description, tags: fm.tags }
  })
}

export async function getPage(slug: string): Promise<WikiPage | null> {
  const filePath = path.join(WIKI_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, 'utf-8')
  const stat = fs.statSync(filePath)
  const page = await processMarkdown(source, slug)
  page.lastModified = stat.mtime.toISOString().split('T')[0]

  return page
}

export { slugify }

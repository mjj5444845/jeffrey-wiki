import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPage, getAllSlugs, getAllPagesMeta } from '@/lib/pages'
import WikiLayout from '@/components/WikiLayout'
import WikiContent from '@/components/WikiContent'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return { title: 'Not Found' }
  return {
    title: `${page.title} — Junjie Ma`,
    description: page.description,
  }
}

export default async function WikiPage({ params }: Props) {
  const { slug } = await params
  const [page, allPages] = await Promise.all([getPage(slug), Promise.resolve(getAllPagesMeta())])

  if (!page) notFound()

  return (
    <WikiLayout pages={allPages}>
      <WikiContent page={page} />
    </WikiLayout>
  )
}

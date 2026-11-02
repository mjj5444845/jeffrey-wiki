import WikiPage from './wiki/[slug]/page'

// Static hosts cannot perform Next.js server redirects.
export default function Home() {
  return <WikiPage params={Promise.resolve({ slug: 'home' })} />
}

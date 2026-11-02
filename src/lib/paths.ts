// Next Link adds basePath automatically; raw HTML and public assets need it explicitly.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function withBasePath(url: string): string {
  if (!url.startsWith('/') || url.startsWith('//')) return url
  return `${basePath}${url}`
}

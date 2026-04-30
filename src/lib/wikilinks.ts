import { visit } from 'unist-util-visit'
import type { Root, Text, Link } from 'mdast'
import type { Plugin } from 'unified'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

// Remark plugin: transforms [[Page Name]] and [[Page Name|Display Text]] into links
const remarkWikiLinks: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return

      const wikilinkRegex = /\[\[([^\]]+)\]\]/g
      const text = node.value
      let match: RegExpExecArray | null
      const parts: (Text | Link)[] = []
      let lastIndex = 0

      while ((match = wikilinkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ type: 'text', value: text.slice(lastIndex, match.index) })
        }

        const inner = match[1]
        const pipeIndex = inner.indexOf('|')
        const pageName = pipeIndex !== -1 ? inner.slice(0, pipeIndex) : inner
        const displayText = pipeIndex !== -1 ? inner.slice(pipeIndex + 1) : inner

        parts.push({
          type: 'link',
          url: `/wiki/${slugify(pageName)}`,
          title: null,
          children: [{ type: 'text', value: displayText }],
        } as Link)

        lastIndex = match.index + match[0].length
      }

      if (parts.length === 0) return

      if (lastIndex < text.length) {
        parts.push({ type: 'text', value: text.slice(lastIndex) })
      }

      parent.children.splice(index, 1, ...parts)
    })
  }
}

export default remarkWikiLinks
export { slugify }

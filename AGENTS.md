# JeffreyWiki agent guide

This file is the shared source of project instructions for coding agents. `CLAUDE.md`
imports it; keep project rules here rather than duplicating them in tool-specific files.

## Project and structure

Personal academic homepage of Junjie Ma (马骏杰), a Computer Science Ph.D.
student at George Mason University, advised by Zhicong Lu. The site uses a
Wikipedia-inspired design, Next.js 16 App Router, React 19, TypeScript, Tailwind 4,
and Markdown with YAML front matter.

- `content/wiki/`: article sources; filenames become `/wiki/<slug>`.
- `public/`: images and other public assets.
- `src/app/`: routes, metadata, and global styles.
- `src/components/`: layout, navigation, articles, infobox, and contents panel.
- `src/lib/pages.ts`: filesystem access and article ordering.
- `src/lib/markdown.ts`: Markdown rendering, infobox parsing, heading extraction.
- `src/lib/wikilinks.ts`: `[[Page Name]]` and `[[Page Name|Label]]` links.
- `src/lib/siteConfig.ts`: shared site constants and ordered navigation slugs.
- `src/lib/ui.ts`: shared English UI labels; the site has no language switcher.
- `src/types/wiki.ts`: article and metadata types.

`/` renders the home article; `/wiki/index` lists all articles; `/message` is a
static contact page. There is no search route or contact backend. Section pages
follow `siteConfig.navigationSlugs`; other articles appear under Pages automatically.
Do not maintain a second page inventory in documentation.

## Implementation

Before changing Next.js APIs or configuration, read the relevant installed guide
in `node_modules/next/dist/docs/`; this version may differ from older releases.
Use `next/link` for internal navigation in React components. Keep components on
the server unless they need state, browser APIs, or pathname access. Reuse shared
site constants and UI labels rather than introducing duplicates.

The Markdown pipeline is remark-parse → remark-gfm → wikilinks → remark-rehype →
rehype-raw → rehype-slug → heading extraction → rehype-stringify. Raw HTML is
intentional for trusted repository content, particularly the home-page navbox.
Do not treat it as a renderer for untrusted user submissions.

## Content schema

```yaml
---
title: Page Title
description: A concise summary
tags: [research]
---
```

`title` is required. Optional keys are `description` (string), `tags` (string array),
and `infobox` (mapping of string values). Infobox reserves `title`, `image`, and
`imageCaption`; other keys become table rows with camelCase labels split into words.
Image paths start at `public/`, e.g. `/profile.jpg`. Infobox values support
`{age:YYYY-MM}`, `[label](url)`, and literal `\n` for line breaks.

Start the body with a lead paragraph or `##`, never `#`; the title is already an h1.
Use `[[Research]]` or `[[Research|label]]` for internal article links. Targets are
lowercased, whitespace becomes hyphens, and other non-word characters are removed.
Check that targets exist when adding or renaming articles.

## Editorial rules

- Write in third person: “Junjie Ma” or “he”, with neutral academic prose and no emoji.
- Body sections use paragraphs or tables. Bullet/numbered lists are allowed only in
  See Also, External Links, References, and Footnotes sections.
- Order: lead, body sections, See Also, External Links, References/Footnotes.
- Biography updates belong in the relevant academic-year section on `home.md`,
  e.g. `## PhD, Year One (2025–2026)`, as integrated prose without date stamps.
- Paper overviews use a short title, infobox, concise neutral sections, and references.
- Use ACM reference format for publications: full authors, year, title, italicized
  proceedings, publisher, location, pages, and DOI when available. Prefer official
  publication records over preprints; mark accepted work as forthcoming and do not
  invent missing bibliographic fields.
- The SIGCSE TS 2027 NKI Teaching Lab title, author list, and acceptance venue are
  approved for publication. Do not add a manuscript or further unpublished details
  without the owner's instruction.
- Add relevant reciprocal See Also links when updating related articles. Do not
  invent facts or delete substantive articles merely because they are rarely linked.
- Keep the Friends navbox last on `home.md`. Reuse its existing HTML structure and
  `wiki-navbox` classes: group labels in `th`, links separated by ` · `, alternating
  `wiki-navbox-even` cells, and no edit badge. Article content is the source of truth
  for friend names and URLs.
- Preserve the existing Read / Contact / View history tabs. There is no Edit tab,
  personal-wiki tagline, sidebar wordmark, or language toggle.

## Validation and maintenance

Use `npm ci` to install the locked dependencies on the current OS; do not copy
`node_modules` between operating systems. Requires Node.js 20.9 or later and npm.
Run `npm run lint` and `npm run build` after code changes. For content changes,
also check front matter, internal links, referenced images, and related articles.
Keep personal permissions, absolute machine paths, generated files, and credentials
out of Git. Keep setup and maintenance instructions in this guide; README stays
limited to the personal-homepage description, LLM Wiki inspiration, and MIT license.


## GitHub Pages deployment

`.github/workflows/pages.yml` builds and deploys `main` through GitHub Actions.
Next.js exports static files to ignored `out/`; no server or `next start` is used.
Run `npm run dev` locally or serve `out/` with any static HTTP server after building.
The workflow reads Pages `base_path` into `NEXT_PUBLIC_BASE_PATH` before building.
For the default project URL this is `/jeffrey-wiki`; local development defaults to
an empty prefix. Use `next/link` for React page links (it adds the prefix itself)
and `withBasePath` for public assets and plain HTML URLs. The Markdown pipeline
prefixes local href/src attributes after raw HTML parsing. Keep `trailingSlash`,
static dynamic-route parameters, and unoptimized images enabled for static hosting.
Verify exports with `NEXT_PUBLIC_BASE_PATH=/jeffrey-wiki npm run build`, checking
that internal links and image/style/script assets resolve under that prefix.
`vercel.json` disables Git-triggered Vercel deployments; existing deployments
remain until removed in Vercel. README intentionally remains minimal; deployment
details belong here.

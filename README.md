# JeffreyWiki

Junjie Ma's (马骏杰) personal academic homepage and knowledge base, with a
Wikipedia-inspired layout. Built with Next.js 16 App Router, React 19,
TypeScript, Tailwind CSS 4, and Markdown. Wiki articles are prerendered at build time.

## Local development

Requires **Node.js 20.9 or later** and npm. macOS, Linux, and Windows are supported;
install dependencies on the OS where the application will run.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production:

```sh
npm run lint
npm run build
npm start
```

`npm start` serves the production build; it requires `npm run build` first.

## Repository layout

```text
content/wiki/      Markdown articles and front matter
public/            Public images and assets
src/app/           Routes, metadata, global CSS
src/components/    Shared wiki UI
src/lib/           Content pipeline, configuration, UI labels
src/types/         Shared TypeScript types
AGENTS.md          Shared agent and content-authoring instructions
CLAUDE.md          Claude entry point referencing AGENTS.md
```

Article filenames map to `/wiki/<slug>`. `/` redirects to `/wiki/home`,
`/wiki/index` lists all articles, and `/message` provides contact links.
The site includes wikilinks, automatic contents panels, infoboxes, and a Friends navbox.

## Editing

Edit articles in `content/wiki/`; see [AGENTS.md](AGENTS.md) for the front matter,
writing style, linking rules, and validation workflow. Configure navigation and
shared site constants in `src/lib/siteConfig.ts`; English UI labels live in
`src/lib/ui.ts`. New non-section articles appear in the sidebar automatically.

## Inspiration

Inspired by Wikipedia and Andrej Karpathy's
[LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f):
Markdown stores the knowledge, and shared agent instructions define how to maintain it.

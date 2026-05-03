# JeffreyWiki

## What is this

JeffreyWiki is the personal academic homepage of Junjie Ma (马骏杰), a Ph.D. student in Computer Science at George Mason University. The site is styled after Wikipedia and serves as a knowledge base covering research interests, publications, teaching experience, mentoring, and personal notes.

## Inspiration

Junjie Ma has substantial research experience on Wikipedia and Wikidata, and continues to hold a deep interest in the wiki ecosystem. This homepage was inspired by [Andrej Karpathy](https://karpathy.ai/) and his [LLM.md post](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — a wiki-style document organizing knowledge about large language models — alongside a long-standing personal affinity for the wiki format as a medium for structured, interconnected knowledge.

Built with **Next.js 16** (App Router, fully static SSG) + **Markdown** files. Key features:

- Front matter (YAML metadata per page)
- Wikipedia-style floating infoboxes with dynamic age calculation
- `[[wikilink]]` syntax for internal links
- Auto-generated Table of Contents
- Static Contact page (`/message`) with email and LinkedIn links
- Friends navbox on the home page with an introductory paragraph

## Local Development & Build

**Prerequisites:** Node.js 18 or later. On Windows, install via [Scoop](https://scoop.sh/): `scoop install nodejs-lts`.

> Run all commands in **Windows PowerShell** — not WSL bash. The native `lightningcss` binaries installed by npm are Windows-specific; running from WSL causes a platform mismatch error.

```powershell
# Install dependencies
npm install

# Start dev server → http://localhost:3000
npm run dev

# Production build (verifies all pages generate without error)
npm run build
```

Content lives in `content/wiki/`. Each `<slug>.md` file is one page. See `CLAUDE.md` for the full authoring guide.

## Pages

| URL | Description |
|---|---|
| `/wiki/home` | Introduction — main landing page |
| `/wiki/research` | Research interests and themes |
| `/wiki/publications` | Papers and projects |
| `/wiki/mentoring` | Mentoring and mentees |
| `/wiki/teaching` | TA history |
| `/wiki/miscellanea` | Personal miscellany |
| `/message` | Contact page (email + LinkedIn) |

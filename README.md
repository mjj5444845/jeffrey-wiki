# JeffreyWiki

## What is this

JeffreyWiki is the personal academic homepage of Junjie Ma (马骏杰), a Ph.D. student in Computer Science at George Mason University. The site is styled after Wikipedia and serves as a knowledge base covering research interests, publications, teaching experience, mentoring, and personal notes.

Built with **Next.js 16** (App Router, fully static SSG) + **Markdown** files. Key features:

- Front matter (YAML metadata per page)
- Wikipedia-style floating infoboxes with dynamic age calculation
- `[[wikilink]]` syntax for internal links
- Auto-generated Table of Contents
- Contact form that pre-fills a GitHub Issue (no backend required)
- Friends navbox on the home page

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

## GitHub Setup

The contact form (`/message`) redirects to a pre-filled GitHub issue. For the `message` label to be applied automatically, create it in the repository: **Issues → Labels → New label → "message"**.

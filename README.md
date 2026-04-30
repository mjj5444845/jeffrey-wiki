# JeffreyWiki

## What is this

JeffreyWiki is Junjie Ma's personal academic homepage, styled after Wikipedia. It serves as a knowledge base covering research interests, teaching experience, mentoring, and personal notes, and supports bilingual browsing (English / 中文).

Built with **Next.js 16** (App Router, fully static SSG) + **Markdown** files. Key features:

- Front matter (YAML metadata per page)
- Wikipedia-style floating infoboxes with dynamic age calculation
- `[[wikilink]]` syntax for internal links
- Auto-generated Table of Contents
- EN / ZH language toggle (persisted in localStorage)

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

Content lives in `content/wiki/`. Each `<slug>.md` file is an English page; a matching `<slug>.zh.md` provides the Chinese translation. See `CLAUDE.md` for the full authoring guide.

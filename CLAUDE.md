@AGENTS.md

# Junjie Ma — Personal Academic Homepage

## Site Overview

This is the personal academic homepage of **Junjie Ma (马骏杰, Jeffrey)**, a Ph.D. student in Computer Science at George Mason University. The site is styled after Wikipedia and built with Next.js (App Router) + Markdown files.

**Owner:** Junjie Ma (马骏杰), also goes by Jeffrey  
**Affiliation:** Ph.D. student, Dept. of Computer Science, George Mason University  
**Advisor:** Dr. Zhicong Lu  
**Email:** jma26@gmu.edu

---

## Technology Stack

| Layer | Library / Tool |
|---|---|
| Framework | Next.js 16 (App Router, fully static SSG) |
| Styling | Tailwind CSS v4 + custom Wikipedia-style CSS in `src/app/globals.css` |
| Markdown pipeline | `unified` → `remark-parse` → `remark-gfm` → wikilink plugin → `remark-rehype` → `rehype-raw` → `rehype-slug` → heading extractor → `rehype-stringify` |
| Front matter | `gray-matter` (YAML) |
| Wikilinks | Custom remark plugin at `src/lib/wikilinks.ts` |
| i18n | `src/lib/i18n.ts` + `src/context/LanguageContext.tsx` (React Context) |
| Type definitions | `src/types/wiki.ts` |

---

## Content Architecture

All pages live as Markdown files in `content/wiki/`. The file name (without `.md`) becomes the URL slug.

### Page Map

| English file | Chinese file | URL | Description |
|---|---|---|---|
| `home.md` | `home.zh.md` | `/wiki/home` | Main landing page |
| `research.md` | `research.zh.md` | `/wiki/research` | Research interests |
| `publications.md` | `publications.zh.md` | `/wiki/publications` | Papers and projects |
| `teaching.md` | `teaching.zh.md` | `/wiki/teaching` | TA history at U of M |
| `mentoring.md` | `mentoring.zh.md` | `/wiki/mentoring` | Mentoring and mentees |
| `miscellanea.md` | `miscellanea.zh.md` | `/wiki/miscellanea` | Personal miscellany |

- The root `/` redirects to `/wiki/home`.
- `/wiki/index` auto-generates an alphabetical index of all English pages.
- `*.zh.md` files are loaded automatically alongside their English counterpart; they never appear as separate pages.

---

## Front Matter Schema

Every `.md` file **must** begin with YAML front matter:

```yaml
---
title: Page Title           # required — rendered as <h1> and used in <title>
description: One-liner      # optional — shown in italic under the title; used in meta tags
tags: [tag1, tag2]          # optional — rendered as chips in the page footer
infobox:                    # optional — renders a Wikipedia-style float-right sidebar table
  title: Box header text
  image: /public-path.png   # path relative to /public/
  imageCaption: Caption text
  FieldLabel: Plain text value
  AnotherField: Another value
---
```

Do **not** use `#` (h1) in the markdown body — the `title` front matter already renders as h1. Start body content with `##` (h2) or a plain paragraph.

---

## Infobox

The infobox floats to the right of the article body (Wikipedia-style). It is defined inside `infobox:` in front matter and rendered by `src/components/Infobox.tsx`.

**Reserved keys** (not rendered as table rows):

| Key | Effect |
|---|---|
| `title` | Rendered as the blue header bar of the box |
| `image` | Path to an image in `/public/` |
| `imageCaption` | Caption text shown below the image |

Every other key becomes a row: the key is the label, the value is the data. Labels are split on camelCase boundaries (`MyLabel` → `My Label`). Infobox values are **plain text only** — do not use Markdown or links inside infobox values.

---

## Bilingual Content

Each page can have an optional Chinese translation file named `<slug>.zh.md`. When present:

- A **🌐 language toggle button** appears at the top-right of the article (same row as the "Read/Edit/History" tabs, aligned left).
- The toggle persists in `localStorage` across page navigations.
- Clicking it switches the article content (title, description, infobox, body) to the Chinese version.
- The URL does **not** change.
- All UI labels (tabs, TOC, sidebar, footer) also switch language via `LanguageContext`.

The Chinese file follows the exact same front matter schema. Infobox field keys can be Chinese (e.g., `职位:`) — they will display as-is since there are no camelCase boundaries to split.

---

## Wikilinks

Use `[[Page Name]]` anywhere in markdown body to create an internal link. The slug is derived by lower-casing and hyphenating the page name.

| Syntax | Rendered link |
|---|---|
| `[[Research]]` | `/wiki/research` |
| `[[Publications]]` | `/wiki/publications` |
| `[[Research\|研究]]` | `/wiki/research`, displays "研究" |

This works identically in both English and Chinese `.md` files. In Chinese files, always use `[[EnglishSlug\|中文显示文字]]` so the link resolves correctly.

---

## Writing Conventions

### Voice
- **All pages must be written in third person.** Use "Junjie Ma" or "he" — never "I" or "my".
- This applies equally to English and Chinese files.
- Chinese third-person convention: use "马骏杰" on first reference, then "他" thereafter.

### Lists (bullet points)
- **No bullet or numbered lists in the article body.** Convert them to flowing prose paragraphs.
- Lists are **only permitted** in these sections at the bottom of a page:
  - `## See Also` / `## 参见`
  - `## External Links` / `## 外部链接`
  - `## References` / `## 参考文献`
  - `## Footnotes` / `## 注释`
- Tables are allowed anywhere and are the preferred format for structured data.

### Tone
- Academic: precise, neutral, no marketing language.
- Chinese text is natural and welcome throughout.
- Emoji is allowed in External Links sections only (📧 🎓 💼 etc.).

### Section structure (recommended order)
1. Opening paragraph (no heading — the first paragraph is the lead)
2. Body sections (`##`)
3. `## See Also` (if applicable)
4. `## External Links` (if applicable)
5. `## References` / `## Footnotes` (if applicable)

---

## Adding or Updating Content

### Add a new page
1. Create `content/wiki/your-slug.md` with front matter (`title` required).
2. Optionally create `content/wiki/your-slug.zh.md` for the Chinese version.
3. The page is available at `/wiki/your-slug` after the next build.

### Add a publication
Edit `content/wiki/publications.md` (and `.zh.md`). Use a table under a `## Year` heading.

### Add a news item
Edit `content/wiki/home.md`. Add a new line at the **top** of `## News` in the format:
```
**MM/DD/YYYY** — Event description (third person, no bullet).
```

### Add a mentee
Edit `content/wiki/mentoring.md` (and `.zh.md`). Add a row to the mentees table.

---

## Images

Place image files in `/public/`. Reference them as `/filename.ext` in front matter or markdown `![alt](/filename.ext)`.

**Profile photo:** Place the profile image at `/public/profile.png`. It is referenced in `home.md`'s infobox.

---

## i18n System

UI strings live in `src/lib/i18n.ts`. To add or change a label, edit both the `en` and `zh` keys there.

The language is provided by `LanguageContext` (`src/context/LanguageContext.tsx`), which wraps the app in `src/app/layout.tsx`. All layout components (`WikiLayout`, `WikiNav`, `WikiContent`, `TableOfContents`) are client components that call `useLanguage()` to get the current `lang` and `t` (translation object).

---

## Site Name & Metadata

The site name **"Junjie Ma"** is the default prop in `WikiLayout` and `WikiNav`. Global `<title>` and `<meta description>` are in `src/app/layout.tsx`. Per-page titles are `"${page.title} — Junjie Ma"` (see `src/app/wiki/[slug]/page.tsx`).

---

## Running Locally

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build — run this to verify zero errors after any change
```

**Run from Windows PowerShell** (not WSL bash). Native `.node` binaries (lightningcss) were installed for Windows; running from WSL causes a platform mismatch error.

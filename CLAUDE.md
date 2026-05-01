@AGENTS.md

# JeffreyWiki — Personal Academic Homepage

## Site Overview

This is the personal academic homepage of **Junjie Ma (马骏杰, Jeffrey)**, a Ph.D. student in Computer Science at George Mason University. The site is styled after Wikipedia and built with Next.js (App Router) + Markdown files.

**Site name:** JeffreyWiki  
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
| Site constants | `src/lib/siteConfig.ts` (name, email, messageUrl, historyUrl) |
| i18n | `src/lib/i18n.ts` + `src/context/LanguageContext.tsx` (English-only; provides `t` to all layout components) |
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
- `/wiki/index` auto-generates an alphabetical index of all pages.
- `/message` is the contact form page (not a wiki page).

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

The infobox floats to the right of the article body (Wikipedia-style). It is defined inside `infobox:` in front matter and rendered by `src/components/Infobox.tsx` (a client component).

**Reserved keys** (not rendered as table rows):

| Key | Effect |
|---|---|
| `title` | Rendered as the blue header bar of the box |
| `image` | Path to an image in `/public/` |
| `imageCaption` | Caption text shown below the image |

Every other key becomes a row: the key is the label, the value is the data. Labels are split on camelCase boundaries (`MyLabel` → `My Label`).

**Special value tokens supported by Infobox:**

| Token | Example | Effect |
|---|---|---|
| `{age:YYYY-MM}` | `December 1996 {age:1996-12}` | Replaced with `(age N)` at render time |
| `[text](url)` | `[jma26@gmu.edu](mailto:jma26@gmu.edu)` | Rendered as `<a>` link |
| Literal `\n` | `B.S. ...\nM.S. ...` | Rendered as `<br />` line break |

---

## Article Tabs

Each wiki article page shows three tabs in the top-right of the content area:

| Tab | Behavior |
|---|---|
| **Read** (EN) / **阅读** (ZH) | Active on wiki article pages |
| **Message** (EN) / **留言** (ZH) | Links to `/message` (contact form) |
| **View History** (EN) / **查看历史** (ZH) | Opens `https://github.com/mjj5444845/jeffrey-wiki/commits/main/` in a new tab |

There is **no** "Edit" tab. There is **no** "From Junjie Ma's personal wiki" tagline anywhere. There is **no** language toggle button.

---

## Contact Form (`/message`)

`src/app/message/page.tsx` renders a simple form (Title + Text + Send button) via `src/components/MessageForm.tsx`.

On submit, it constructs a `mailto:jma26@gmu.edu?subject=...&body=...` URL and sets `window.location.href`. This opens the user's default email client — no backend required.

All labels on the form are i18n'd via `useLanguage()` (`msgTitleLabel`, `msgTextLabel`, `msgSendBtn`, `msgNote`).

---

## Wikilinks

Use `[[Page Name]]` anywhere in markdown body to create an internal link. The slug is derived by lower-casing and hyphenating the page name.

| Syntax | Rendered link |
|---|---|
| `[[Research]]` | `/wiki/research` |
| `[[Publications]]` | `/wiki/publications` |
| `[[Research\|研究]]` | `/wiki/research`, displays "研究" |

In Chinese files, always use `[[EnglishSlug\|中文显示文字]]` so the link resolves correctly.

---

## Writing Conventions

### Voice
- **All pages must be written in third person.** Use "Junjie Ma" or "he" — never "I" or "my".

### Lists (bullet points)
- **No bullet or numbered lists in the article body.** Convert them to flowing prose paragraphs.
- Lists are **only permitted** in these sections:
  - `## See Also` / `## 参见`
  - `## External Links` / `## 外部链接`
  - `## References` / `## 参考文献`
  - `## Footnotes` / `## 注释`
- Tables are allowed anywhere and are the preferred format for structured data.

### Tone
- Academic: precise, neutral, no marketing language.
- Emoji is allowed in External Links sections only (📧 🎓 💼 etc.).

### Section structure (recommended order)
1. Opening paragraph (no heading — the first paragraph is the lead)
2. Body sections (`##`)
3. `## See Also` (if applicable)
4. `## External Links` (if applicable)
5. `## References` / `## Footnotes` (if applicable)

---

## Site Constants (`src/lib/siteConfig.ts`)

All site-wide constants are centralized here:

```ts
const siteConfig = {
  name: 'JeffreyWiki',
  email: 'jma26@gmu.edu',
  historyUrl: 'https://github.com/mjj5444845/jeffrey-wiki/commits/main/',
  messageUrl: '/message',
} as const
```

Do **not** hardcode the site name, email, or these URLs elsewhere — always import from `siteConfig`.

---

## Sidebar (WikiNav)

The sidebar has **no wordmark section** — the `wiki-nav-wordmark` div was removed. The first nav section uses class `wiki-nav-section-first` to add top padding.

Sections:
1. **Navigation** — Main Page link only
2. **Pages** — all wiki pages from `getAllPagesMeta()`

There is **no** "All pages" link in the sidebar.

---

## i18n System

UI strings live in `src/lib/i18n.ts`. Both `en` and `zh` objects must have identical keys. Type: `I18n = Record<keyof typeof i18n.en, string>`.

Key i18n entries:
- `tabMessage` / `tabHistory` — article tab labels
- `msgTitleLabel`, `msgTextLabel`, `msgSendBtn`, `msgNote` — contact form labels

---

## Running Locally

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build — run this to verify zero errors after any change
```

**Run from Windows PowerShell** (not WSL bash). Native `.node` binaries (lightningcss) were installed for Windows; running from WSL causes a platform mismatch error.

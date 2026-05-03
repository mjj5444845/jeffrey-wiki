@AGENTS.md

# JeffreyWiki — Personal Academic Homepage

## Site Overview

This is the personal academic homepage of **Junjie Ma (马骏杰, Jeffrey)**, a Ph.D. student in Computer Science at George Mason University. The site is styled after Wikipedia and built with Next.js (App Router) + Markdown files.

**Site name:** JeffreyWiki  
**Owner:** Junjie Ma (马骏杰), also goes by Jeffrey  
**Affiliation:** Ph.D. student, Dept. of Computer Science, George Mason University  
**Advisor:** Dr. Zhicong Lu  
**Email:** jma26@gmu.edu

This site is inspired by Andrej Karpathy's [LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): `content/wiki/` is the LLM-maintained wiki artifact, and `CLAUDE.md` is the schema that tells the LLM how to maintain it. Content updates are handled conversationally — describe the change, and the LLM writes, cross-references, and keeps the wiki consistent. **Keep `CLAUDE.md` updated whenever site conventions change** — it is the contract between the owner and the LLM.

---

## Technology Stack

| Layer | Library / Tool |
|---|---|
| Framework | Next.js 16 (App Router, fully static SSG) |
| Styling | Tailwind CSS v4 + custom Wikipedia-style CSS in `src/app/globals.css` |
| Markdown pipeline | `unified` → `remark-parse` → `remark-gfm` → wikilink plugin → `remark-rehype` → `rehype-raw` → `rehype-slug` → heading extractor → `rehype-stringify` |
| Front matter | `gray-matter` (YAML) |
| Wikilinks | Custom remark plugin at `src/lib/wikilinks.ts` |
| i18n | `src/lib/i18n.ts` + `src/context/LanguageContext.tsx` (English-only; provides `t` to all layout components) |
| Site constants | `src/lib/siteConfig.ts` (name, email, messageUrl, historyUrl, issuesUrl) |
| Type definitions | `src/types/wiki.ts` |

---

## Content Architecture

All pages live as Markdown files in `content/wiki/`. The file name (without `.md`) becomes the URL slug.

### Page Map

| File | URL | Description |
|---|---|---|
| `home.md` | `/wiki/home` | Main landing page |
| `research.md` | `/wiki/research` | Research interests |
| `publications.md` | `/wiki/publications` | Papers and projects |
| `teaching.md` | `/wiki/teaching` | TA history at U of M |
| `mentoring.md` | `/wiki/mentoring` | Mentoring and mentees |
| `miscellanea.md` | `/wiki/miscellanea` | Personal miscellany |

- The root `/` redirects to `/wiki/home`.
- `/wiki/index` auto-generates an alphabetical index of all pages.
- `/message` is the contact page (not a wiki page).

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
| **Read** | Active on wiki article pages |
| **Contact** | Links to `/message` (contact page) |
| **View History** | Opens `https://github.com/mjj5444845/jeffrey-wiki/commits/main/` in a new tab |

There is **no** "Edit" tab. There is **no** "From Junjie Ma's personal wiki" tagline anywhere. There is **no** language toggle button.

---

## Contact Page (`/message`)

`src/app/message/page.tsx` renders a static contact page — no form, no backend.

It displays a short introductory paragraph and a two-row table with:
- **Email** — `jma26@gmu.edu` (mailto link)
- **LinkedIn** — `linkedin.com/in/mjj11788178` (external link, opens in new tab)

The page title is "Contact" (rendered as `<h1>`). The tab label in article pages is also "Contact" (`tabMessage` key in `i18n.ts`).

---

## Wikilinks

Use `[[Page Name]]` anywhere in markdown body to create an internal link. The slug is derived by lower-casing and hyphenating the page name.

| Syntax | Rendered link |
|---|---|
| `[[Research]]` | `/wiki/research` |
| `[[Publications]]` | `/wiki/publications` |
| `[[Research\|Custom Text]]` | `/wiki/research`, displays "Custom Text" |

---

## Writing Conventions

### Voice
- **All pages must be written in third person.** Use "Junjie Ma" or "he" — never "I" or "my".

### Lists (bullet points)
- **No bullet or numbered lists in the article body.** Convert them to flowing prose paragraphs.
- Lists are **only permitted** in these sections:
  - `## See Also`
  - `## External Links`
  - `## References`
  - `## Footnotes`
- Tables are allowed anywhere and are the preferred format for structured data.

### Tone
- Academic: precise, neutral, no marketing language.
- No emoji anywhere on the site.

### Section structure (recommended order)
1. Opening paragraph (no heading — the first paragraph is the lead)
2. Body sections (`##`)
3. `## See Also` (if applicable)
4. `## External Links` (if applicable)
5. `## References` / `## Footnotes` (if applicable)
6. Friends navbox (if on the home page — see below)

---

## Friends Navbox (`content/wiki/home.md`)

A Wikipedia-style navbox sits at the very end of `home.md`, after the `## External Links` section. It is written as raw HTML (passed through by `rehype-raw`) and styled via `.wiki-navbox` classes in `globals.css`.

**Template for adding / editing friend links:**

```html
<div class="wiki-navbox">
<table><tbody>
<tr><th class="wiki-navbox-title" colspan="2">Friends &amp; Colleagues — Personal Homepages</th></tr>
<tr>
<th class="wiki-navbox-group">HCI</th>
<td class="wiki-navbox-list"><div>
<a href="URL">Name</a> ·
<a href="URL">Name</a>
</div></td>
</tr>
<tr>
<th class="wiki-navbox-group">Others</th>
<td class="wiki-navbox-list wiki-navbox-even"><div>
<a href="URL">Name</a>
</div></td>
</tr>
</tbody></table>
</div>
```

**Rules:**
- Each `<tr>` after the title row is one group. Add more `<tr>` blocks for more groups.
- Separate links within a group with ` · ` (space, middle dot, space).
- Alternate rows use class `wiki-navbox-even` on `<td>` for a light gray tint.
- Group label goes in `<th class="wiki-navbox-group">`.
- Do **not** add a `v · t · e` badge — this navbox has no edit links.

**Current entries (update when friends are added/removed):**

| Group | Name | URL |
|---|---|---|
| HCI | Charles Chuankai Zhang | https://chuankaizhang.com/#/ |
| Others | Jialiang Gu | https://gujialiang123.github.io/ |

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

Do **not** hardcode the site name, email, or URLs elsewhere — always import from `siteConfig`. The `issuesUrl` field was removed when the contact page switched to a static page.

---

## Sidebar (WikiNav)

The sidebar has **no wordmark section** — the `wiki-nav-wordmark` div was removed. The first nav section uses class `wiki-nav-section-first` to add top padding.

Sections:
1. **Navigation** — Main Page link only
2. **Pages** — all wiki pages from `getAllPagesMeta()`

There is **no** "All pages" link in the sidebar.

---

## i18n System

UI strings live in `src/lib/i18n.ts`. English-only. Type: `I18n = Record<keyof typeof i18n.en, string>`.

Key i18n entries:
- `tabRead`, `tabMessage`, `tabHistory` — article tab labels (`tabMessage` renders as "Contact")

---

## Content Update Workflow

This wiki follows the LLM Wiki pattern: the owner provides content direction; the LLM handles writing, formatting, and cross-referencing.

**To add or update content on a page:** Describe the facts or changes in plain language. The LLM writes the prose in third-person academic style, respects all conventions in this file, and updates any related cross-references (See Also, wikilinks on other pages).

**To add a new page:** Provide the slug, title, and key content. The LLM creates the `.md` file with correct front matter, writes the body, and links it from related pages' See Also sections.

**To health-check the wiki (lint):** Ask the LLM to review the wiki for stale content, missing cross-references, orphan pages, or inconsistencies between pages.

**Cross-referencing rule:** When content on one page is relevant to another, always add or update the See Also section on both sides. The wiki's value comes from its interconnections.

---

## Running Locally

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build — run this to verify zero errors after any change
```

**Run from Windows PowerShell** (not WSL bash). Native `.node` binaries (lightningcss) were installed for Windows; running from WSL causes a platform mismatch error.

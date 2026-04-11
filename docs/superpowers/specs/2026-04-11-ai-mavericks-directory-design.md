# AI Mavericks Community Directory — Design Spec

## Overview

A single-page React application showcasing members of the AI Mavericks dinner community in London. The directory serves as both a community tool (80%) for members to find and connect with each other, and a public showcase (20%) of the community's breadth.

Content is sourced from Eddie Forson's Beehiiv newsletters and pre-Beehiiv email recaps spanning 12 dinners (October 2024 — Q1 2026) with ~55 unique members.

## Architecture

### Page Structure

Single page with two sections connected by a sticky navigation bar:

```
+------------------------------------------+
|  [Logo]  AI Mavericks     Members | Dinners  |  <- sticky nav
+------------------------------------------+
|  [Filter pills: combinable tags]         |
+------------------------------------------+
|                                          |
|  MEMBERS SECTION                         |
|  2-column card flip grid                 |
|  +-----------+  +-----------+            |
|  |           |  |           |            |
|  |  photo    |  |  photo    |            |
|  |           |  |           |            |
|  | Name      |  | Name      |            |
|  | Role      |  | Role      |            |
|  +-----------+  +-----------+            |
|  +-----------+  +-----------+            |
|  |           |  |           |            |
|  ...                                     |
+------------------------------------------+
|                                          |
|  DINNERS SECTION                         |
|  Stacked vertically, each dinner:        |
|  +--------------------------------------+|
|  |  HERO: group photo (full width)      ||
|  +--------------------------------------+|
|  |  Description: discussion topics      ||
|  +--------------------------------------+|
|  |  Attendees: YC-style compact cards   ||
|  +--------------------------------------+|
|  ...repeat for each dinner...            |
+------------------------------------------+
|  Footer: Discord, Beehiiv, socials       |
+------------------------------------------+
```

### Navigation

- Sticky nav bar at top with "Members" and "Dinners" anchor links
- Clicking either scrolls smoothly to that section
- Active section highlighted based on scroll position

### Filters

- Combinable pill-style tags above the members grid
- Filter dimensions:
  - **Role type**: Founder, Engineer, Data Scientist, Product Manager, Consultant, Designer, Investor
  - **Interests**: AI Agents, LLMs, RAG, FinTech, Healthcare, Education, Creative AI, Marketing, Robotics
  - **Dinner attended**: Oct 2024, Nov 2024, Dec 2024, Jan 2025, Feb 2025, Mar 2025, Apr 2025, May 2025, Jun 2025, Jul 2025, Dec 2025, Q1 2026
- Multiple filters can be active simultaneously (AND logic within a dimension, OR across dimensions)
- Active filters shown as filled pills; inactive as outlined
- Filter state reflected in URL query params for shareability

## Members Section

### Card Design (Front)

- 3:4 vertical aspect ratio (portrait orientation)
- Photo fills the entire card area
- Photos displayed in grayscale with a subtle sepia tint (CSS `filter: grayscale(100%) sepia(15%)`)
- Placeholder: gradient backgrounds with initials until real headshots are added
- Name overlaid at bottom with a subtle gradient fade-up
- Name in serif italic (Garamond/EB Garamond), ~14px
- Role in tiny uppercase sans-serif (Helvetica Neue), ~8px, with letter-spacing
- Minimal border-radius (2px)

### Card Design (Back / Revealed)

Revealed via card flip animation on click/tap. On desktop, a hover overlay also previews the bio (photo dims, bio text appears over it).

Back of card contains:
- Name (serif italic)
- Role/title (uppercase sans-serif)
- Bio (2-4 sentences, sans-serif, ~13px)
- Interest tags (uppercase, tiny, pipe-separated)
- LinkedIn link
- Dinner(s) attended (linked to dinner section anchors)
- Flip-back icon/affordance

### Hover Behavior (Desktop Only)

- Photo dims to ~35% brightness
- Bio text fades in over the photo, positioned at bottom
- Interest tags shown below bio
- Cobalt or warm-brown accent outline appears around card

### Mobile Behavior

- Hover not available; tap flips the card
- Cards display in single column on small screens (<640px)
- Flip icon visible on card front as affordance

## Dinners Section

Each dinner is a self-contained block, stacked vertically (newest first):

### Dinner Block Structure

1. **Hero image**: Full-width group photo from the dinner, with date and title overlaid
   - Date in tiny uppercase sans-serif
   - Title in serif (e.g. "January 2025 Dinner")
2. **Description**: Discussion topics listed below the hero
   - Bullet list of topics with attribution (who raised them)
   - Links to referenced articles, tools, podcasts preserved from original recaps
3. **Attendees grid**: YC-style compact cards
   - Small square photo/initials + name + role
   - Clickable — scrolls up to that member's card in the Members section
   - 3-4 columns on desktop, 2 on mobile

### Cross-linking

- Member cards link to dinners they attended (on the back/flip side)
- Dinner attendee cards link back to member profiles (smooth scroll)
- All links from original Beehiiv recaps preserved (articles, tools, podcasts, LinkedIn profiles)

## Visual Design

### Typography

| Element | Font | Size | Weight | Style | Spacing |
|---------|------|------|--------|-------|---------|
| Logo/brand | Helvetica Neue | 9px | 300 | uppercase | 2-4px tracking |
| Nav links | Helvetica Neue | 8px | 500 | uppercase | 1.5px tracking |
| Filter pills | Helvetica Neue | 7px | 400 | uppercase | 1px tracking |
| Member name (card) | EB Garamond | 14px | 400 | italic | normal |
| Member role (card) | Helvetica Neue | 8px | 400 | uppercase | 1px tracking |
| Bio text | Helvetica Neue | 13px | 300 | normal | normal |
| Interest tags | Helvetica Neue | 7px | 300 | uppercase | 1px tracking |
| Dinner title | EB Garamond | 22px | 400 | italic | normal |
| Dinner date | Helvetica Neue | 8px | 500 | uppercase | 2px tracking |
| Topic text | Helvetica Neue | 14px | 300 | normal | normal |

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#f9f8f6` | Page background (warm cream) |
| `--text-primary` | `#2a2a2a` | Headings, names |
| `--text-secondary` | `#999` | Roles, metadata |
| `--text-muted` | `#bbb` | Inactive nav, placeholders |
| `--border` | `#e0dcd6` | Dividers, card borders |
| `--filter-bg` | `transparent` | Inactive filter pill |
| `--filter-border` | `#d5d0c8` | Inactive filter pill border |
| `--filter-active-bg` | `#2a2a2a` | Active filter pill |
| `--filter-active-text` | `#f9f8f6` | Active filter pill text |
| `--card-overlay` | `rgba(30,25,20,0.55)` | Gradient overlay on photos |
| `--photo-filter` | `grayscale(100%) sepia(15%)` | Photo treatment |

### Spacing

- Page max-width: 960px, centered
- Card gap: 14px
- Section padding: 40px vertical
- Nav height: 48px

## Data Model

### Content Schema (Keystatic)

```
content/
  members/
    eddie-forson.json
    bode-ogunlana.json
    ...
  dinners/
    2024-10-october.json
    2024-11-november.json
    ...
  tags/
    tags.json          # flat list of all tags with categories
```

### Member Schema

```json
{
  "name": "Eddie Forson",
  "slug": "eddie-forson",
  "title": "Software Engineer & AI Consultant",
  "company": "Kiseki Labs",
  "bio": "Software engineer by trade with experience in finance/FX, mobility startups, energy and reinsurance. Founded Kiseki Labs AI Consultancy. Writes about LLMs and AI Agents on Substack.",
  "photo": "/images/members/eddie-forson.jpg",
  "linkedin": "https://www.linkedin.com/in/eddie-forson/",
  "twitter": "https://x.com/Ed_Forson",
  "website": "https://www.kisekilabs.com/",
  "tags": ["ai-agents", "llms", "consulting", "finance"],
  "roleType": "engineer",
  "dinners": ["2024-10-october", "2024-11-november", "2024-12-december", "2025-01-january", "2025-02-february", "2025-03-march", "2025-04-april", "2025-05-may", "2025-06-june", "2025-07-july", "2025-12-december", "2026-q1"]
}
```

### Dinner Schema

```json
{
  "name": "Q1 2026 Dinner",
  "slug": "2026-q1",
  "date": "2026-03-04",
  "venue": "Pizza Express Live Holborn",
  "groupPhoto": "/images/dinners/2026-q1.jpg",
  "description": "The first AI Mavericks dinner of 2026.",
  "topics": [
    {
      "text": "Should junior developers bother learning traditional coding?",
      "attribution": "Group discussion",
      "links": []
    },
    {
      "text": "Killing the Code Review",
      "attribution": "swyx",
      "links": ["https://x.com/swyx/status/2028795270306079156"]
    }
  ],
  "attendees": ["bode-ogunlana", "david-farrell", "farhath-razzaque", "liberatus", "neil-cameron", "rene-muhire", "eddie-forson"],
  "beehiivUrl": "https://ai-mavericks-ldn.beehiiv.com/p/ai-mavericks-q1-2026-dinner-recap",
  "discordUrl": "https://discord.gg/xTxksjUvnE",
  "lumaUrl": "https://luma.com/zcw87iwr"
}
```

### Tag Schema

```json
{
  "tags": [
    { "id": "ai-agents", "label": "AI Agents", "category": "interest" },
    { "id": "llms", "label": "LLMs", "category": "interest" },
    { "id": "fintech", "label": "FinTech", "category": "interest" },
    { "id": "engineer", "label": "Engineer", "category": "role" },
    { "id": "founder", "label": "Founder", "category": "role" },
    { "id": "data-scientist", "label": "Data Scientist", "category": "role" }
  ]
}
```

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| **Framework** | React + Vite | Fast, lightweight SPA |
| **CMS** | Keystatic | Git-backed, free, nice admin UI for Eddie, JSON content in repo |
| **Styling** | CSS Modules or Tailwind | Component-scoped styles |
| **Fonts** | EB Garamond (Google Fonts) + system Helvetica Neue | Serif/sans-serif pairing |
| **Hosting** | Vercel or Netlify | Free tier, auto-deploys from git |
| **Images** | Static in repo (initially) | `/public/images/members/`, `/public/images/dinners/` |

### Keystatic Integration

- Keystatic runs alongside the Vite dev server locally
- Eddie accesses the admin UI at `localhost:3000/keystatic` during development
- Keystatic Cloud can be enabled later for browser-based editing without running dev server
- Content changes produce git commits to the repo
- Schema defined in `keystatic.config.ts` matching the JSON schemas above

## Content Migration

### Data Sources

1. **Forwarded email recaps** (Oct 2024 — Mar 2025): 7 dinners, extracted from Gmail
2. **Beehiiv newsletter recaps** (Apr 2025 — Q1 2026): 6 dinners (Apr, May, Jun, Jul, Dec 2025, Q1 2026), scraped from the newsletter site
3. **Extracted data saved to**: `.current-website-beehiv/dinner-recaps-beehiiv.md`

### Migration Steps

1. Parse all recap data into the JSON schemas above
2. Create member JSON files (~55 members)
3. Create dinner JSON files (12 dinners)
4. Build tag taxonomy from extracted interests/roles
5. Generate placeholder member photos (gradient + initials) until Eddie provides real headshots
6. Preserve all original links (articles, tools, LinkedIn profiles, Discord, Luma)

## Scope Boundaries

### In Scope (MVP)

- Single-page directory with members and dinners
- Card flip interaction with bio reveal
- Combinable tag filters
- Cross-linking between members and dinners
- Responsive (desktop + mobile)
- Keystatic CMS for Eddie to manage content
- All historical dinner data populated

### Out of Scope

- User authentication / member login
- Self-service profile editing by members
- Search (text search) — filters are sufficient for ~55 members
- Dark mode
- Newsletter subscription integration
- Event RSVP / Luma integration
- Analytics

## Open Questions

None — all design decisions have been made.

# Design Research: AI Mavericks Community Directory

Reference analysis for a single-page member directory for AI Mavericks, a London-based AI dinner community. Approximately 30 members across 7 dinners, displayed as a 2-column card-flip grid with tall portrait photos and bio reveal on flip.

---

## Reference Sites

### 1. ilovecreatives.com/creative-directory

- Grid-based card system with responsive multi-column layout
- Member photos displayed as **grayscale images** -- makes the grid feel cohesive even with diverse photo styles
- Cards show: photo (3:4 vertical aspect ratio), location tags, name, professional title
- Filter system: dropdowns for Services, Location, Collections with multi-select OR/AND logic
- Color: neutral palette, dark text on light backgrounds, brown accent (#472918) on hover
- Typography: clean sans-serif
- Hover: featured profiles show text-based hover effects, buttons change from transparent to accent color
- **Key takeaway:** Grayscale photos + vertical 3:4 cards + minimal text on card = premium feel

### 2. rockhall.com/inductees/

- Exploratory page with "Explore the Hall of Fame" headline
- Search: "Find your favorite artists" placeholder text
- Dual navigation: Alphabetical (A-Z) and chronological (By Year)
- Cards: high-quality imagery (1990x1544px), artist name, descriptive subtitle (150-200 chars), metadata tags (year, category)
- Neutral backgrounds emphasizing imagery
- Bold readable typography
- **Key takeaway:** Large hero images + year/category tags + search-first discovery

### 3. countrymusichalloffame.org/hall-of-fame

- Grid of inductee cards, sortable by A-Z or Class Year
- Cards: member name, induction year, "learn more" link
- Dark theme: background #141414, white text, golden accent #F0B23A
- Typography: Trade Gothic Next Condensed (bold, condensed = authoritative feel)
- Hover: golden accent with underlines
- Minimalist, institutional feel
- **Key takeaway:** Dark theme + gold accent + condensed bold typography = prestigious hall of fame vibe

### 4. ycombinator.com/companies

- Algolia-powered search and filtering
- Dynamic content rendering with Vite
- Card-based company display
- Orange accent, clean grid, batch/year filters, industry tags
- **Key takeaway:** Powerful faceted search, batch-year filtering translates well to dinner-date filtering

### 5. layers.to

- Remix-based React framework
- "Explore" section with "Hot" and "All" filter tabs
- InterVar (variable font) as primary typeface
- System-aware dark/light theme via prefers-color-scheme
- Card-based layout with profile and portfolio displays
- Sections for "Recent jobs" and "Recent signups"
- Community-focused with follow actions
- **Key takeaway:** System theme awareness + variable fonts + community activity feed

### 6. read.cv/explore

- Minimal portfolio cards with generous white space
- Professional profiles with clean presentation
- **Key takeaway:** Ultra-minimal cards with profession + location

### 7. are.na/explore

- Masonry grid layout
- Minimal, almost brutalist aesthetic
- Content blocks of varying sizes
- Very clean typography
- **Key takeaway:** Masonry layout with mixed content types

### 8. polywork.com

- Professional social profiles with colorful tags
- Multi-faceted identity -- not limited to a single job title
- Tag-based discovery
- **Key takeaway:** Multiple roles/tags per person, colorful pill-style tags

### 9. contra.com

- Freelancer directory with portfolio-style cards
- Large cover images per profile
- Skills as filterable tags
- Clean, modern aesthetic
- **Key takeaway:** Portfolio-style cards with skill tags

---

## Design Patterns to Apply

Patterns drawn from the references above, selected for relevance to the AI Mavericks directory.

### Photo Treatment

- **Grayscale photos** (from ilovecreatives): unifies diverse headshots into a cohesive grid without requiring a professional photoshoot or consistent lighting across members
- **3:4 vertical portrait aspect ratio**: tall cards feel editorial and emphasize faces over backgrounds
- High-quality source images cropped consistently to the same ratio

### Card Design

- **Card flip interaction** (chosen for this project): front shows portrait photo with minimal overlay text (name, title); back reveals full bio, links, dinner attendance
- Minimal text on the card face -- let the photo dominate
- Detail lives on the flip side or in a modal, not crowding the grid view
- Consistent card dimensions across the entire grid for visual rhythm

### Filtering and Discovery

- **Combinable pill-style filter tags**: allow users to filter by dinner date, expertise, or role with visible, tappable pills (inspired by Polywork and YC)
- **Dinner-date filtering**: adapt the year/chronological filters from Rock Hall and Country Music Hall of Fame into dinner-number or dinner-date selectors
- **Search bar** with contextual placeholder text (e.g., "Find a Maverick...")
- Consider dual sort: alphabetical and by dinner date

### Color and Theme

- **Dark theme option**: #141414 background with white text and a gold or warm accent conveys prestige (Country Music Hall of Fame pattern)
- **Light theme option**: neutral palette with dark text, subtle accent color on hover (ilovecreatives pattern)
- **System theme awareness**: respect prefers-color-scheme so the directory adapts to user preference (layers.to pattern)
- Accent color candidates: gold (#F0B23A) for prestige, warm brown (#472918) for understated elegance, or a custom brand color

### Typography

- Variable or modern sans-serif typeface for flexibility across weights
- Condensed bold for headings to create an authoritative, editorial feel (Trade Gothic Next Condensed reference)
- Clean sans-serif for body and card text
- Legibility at small sizes for card metadata

### Layout

- **2-column grid** for the card flip format -- balances card size with screen real estate
- Responsive: collapses to single column on mobile
- Consistent gutters and padding
- No masonry -- uniform card heights keep the flip interaction predictable

---

## Summary for Implementation

| Decision | Choice | Reference |
|---|---|---|
| Card aspect ratio | 3:4 vertical portrait | ilovecreatives |
| Photo treatment | Grayscale | ilovecreatives |
| Card interaction | Flip to reveal bio | Client requirement |
| Grid layout | 2-column, uniform height | Project spec |
| Filtering | Pill tags, dinner-date selector, search | YC, Polywork, Rock Hall |
| Theme | Dark with warm accent, system-aware toggle | Country Music HoF, layers.to |
| Typography | Variable sans-serif, condensed bold headings | layers.to, Country Music HoF |
| Card front content | Photo, name, title | ilovecreatives, read.cv |
| Card back content | Bio, links, dinner dates attended | -- |

---

## Source URLs

1. https://ilovecreatives.com/creative-directory
2. https://rockhall.com/inductees/
3. https://countrymusichalloffame.org/hall-of-fame
4. https://ycombinator.com/companies
5. https://layers.to
6. https://read.cv/explore
7. https://are.na/explore
8. https://polywork.com
9. https://contra.com

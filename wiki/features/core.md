# Core Features

Detailed description of the features currently implemented in the Panini World Cup 2026 Album Tracker.

## 1. User Management
- **Local Sessions**: Simple username-based entry.
- **Persistence**: Remembers the last user on the device using `localStorage`.
- **Multi-user Support**: Different users can have their own progress stored locally.

## 2. Sticker Collection Tracking
- **Interactive Grid**: Visual representation of stickers with clear identifiers.
- **Status Toggling**: Easily mark stickers as "Missing" or "Owned".
- **Duplicate Management**: Dedicated controls to increment or decrement the number of repeated stickers.
- **Visual Feedback**: Distinct styles for owned vs. missing stickers (opacity and border changes).

## 3. Advanced Filtering & Search
- **Text Search**: Search by name, ID, or sticker number.
- **Accent-Insensitive**: Ignore diacritics (e.g., searching "jordan" finds "Jordán") for improved accessibility.
- **Category Filter**: Filter by specific sections (Teams, Stadiums, Intro).
- **Status Filter**: Quickly view only owned, missing, or duplicate stickers.

## 4. Hierarchical Navigation & Collapsible UI
- **Two-Level Grouping**: Stickers are organized by Tournament Groups (A-L) and then by Teams/Sections.
- **Independent Collapse**: Ability to collapse entire groups or individual teams to focus on specific sections.
- **Bulk Controls**: Expand/Collapse all groups or sections with a single click in the Filter Bar.
- **Smooth Transitions**: Animated transitions for expanding and collapsing sections using CSS grid techniques.

## 5. Real-time Progress Tracking
- **Dynamic Stats**: Immediate updates to total owned, missing, and duplicate counts.
- **Progress Bar**: Visual indicator of completion percentage.
- **Section Progress**: Track progress within individual sections of the album.

## 6. Data Management (Import/Export)
- **JSON Export**: Generate a JSON string of the current album state for backup or sharing.
- **JSON Import**: Restore album progress from a previously exported JSON string.

## 7. Minimalist Design (UX/UI)
- **Aesthetic**: High-contrast "ink-on-paper" feel using a monochrome palette.
- **Typography**: Exclusive use of IBM Plex Mono for a technical, ledger-like appearance.
- **Responsiveness**: Fully optimized for mobile, tablet, and desktop views.

## 8. Fallback Routing (404 Page)
- **Wildcard Matching**: Catches any undefined URL paths using Angular's wildcard `**` route pattern.
- **Lazy Loading**: Loaded dynamically only when requested to optimize the application's initial bundle size.
- **Minimalist Styling**: Follows the monochrome ledger aesthetics with fully responsive custom layout.

## 9. Security & Hardening (Infrastructure)
- **Rate & Connection Capping**: Caps requests per IP (100 req/15min in Express, 30 req/sec in Nginx) and limits concurrent connections to 20 to prevent DDoS.
- **Header Hardening**: Employs CSP, X-Frame-Options, HSTS, and X-Content-Type-Options via Helmet and Nginx.
- **Container Sandbox**: Runs fully unprivileged as non-root users inside Docker containers with a read-only root filesystem.
- **Dynamic CORS**: Environment-variable-controlled source validation (`ALLOWED_ORIGINS`) with development-friendly local fallbacks.
- **Orchestration Security**: Restricts access via Kubernetes NetworkPolicies, auto-scales under load via HPAs, and ensures high availability via PodDisruptionBudgets.

## 10. Internationalization (i18n)
- **Bilingual Support**: Full support for English (`en-US`) and Spanish (`es-CO`).
- **Seamless Toggling**: Instant language switching without page reloads, managed seamlessly by Angular Signals propagating down to React props.
- **Persistent Choice**: Remembers user language preference via `localStorage` and falls back to browser detection.
- **SSR Compatible**: Statically analyzable translation chunks generated correctly during Vite Server-Side Rendering.

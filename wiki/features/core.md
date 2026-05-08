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
- **Category Filter**: Filter by specific sections (Teams, Stadiums, Intro).
- **Status Filter**: Quickly view only owned, missing, or duplicate stickers.

## 4. Real-time Progress Tracking
- **Dynamic Stats**: Immediate updates to total owned, missing, and duplicate counts.
- **Progress Bar**: Visual indicator of completion percentage.
- **Section Progress**: Track progress within individual sections of the album.

## 5. Data Management (Import/Export)
- **JSON Export**: Generate a JSON string of the current album state for backup or sharing.
- **JSON Import**: Restore album progress from a previously exported JSON string.

## 6. Minimalist Design (UX/UI)
- **Aesthetic**: High-contrast "ink-on-paper" feel using a monochrome palette.
- **Typography**: Exclusive use of IBM Plex Mono for a technical, ledger-like appearance.
- **Responsiveness**: Fully optimized for mobile, tablet, and desktop views.

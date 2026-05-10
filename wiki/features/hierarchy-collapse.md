# Hierarchical Grouping & Collapsible UI

This document details the implementation of the hierarchical grouping system and the two-level collapsible user interface introduced in May 2026.

## Data Hierarchy

Stickers are organized into a two-level hierarchy for improved navigation:

1.  **Tournament Group**: Represented by the `group` field in the `Sticker` model (e.g., "A", "B", "Stadiums").
2.  **Team (Section)**: Represented by the `section` field in the `Sticker` model (e.g., "Argentina", "Ecuador").

### Hierarchical Data Models (`src/app/models/sticker.model.ts`)

```typescript
export interface TeamGroup {
  name: string;
  stickers: Sticker[];
}

export interface TournamentGroup {
  name: string;
  teams: TeamGroup[];
}
```

## State Management (`src/app/services/album.service.ts`)

The `AlbumService` manages the collapse state using two Angular Signals containing Sets of strings:

- `collapsedSections`: Tracks which individual teams are collapsed.
- `collapsedGroups`: Tracks which tournament groups are collapsed.

### Methods

- `toggleSection(section: string)`: Toggles the collapse state of a specific team.
- `toggleGroup(group: string)`: Toggles the collapse state of a tournament group.
- `expandGroups()` / `collapseGroups()`: Bulk actions for groups only.
- `expandAll()` / `collapseAll()`: Resets all collapse states (both groups and teams).

## UI Implementation (`src/app/components/sticker-grid/StickerGridReact.tsx`)

The UI uses **React v19** to render the nested structure.

### Smooth Transitions

Animations are handled using a CSS grid trick to achieve a smooth height transition without knowing the exact pixel height:

```tsx
<div className={`grid transition-all duration-300 ease-in-out ${isCollapsed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
  <div className="overflow-hidden">
    {/* Content goes here */}
  </div>
</div>
```

### Layout Features

- **Sticky Group Headers**: Tournament group headers stay stuck to the top of the viewport while scrolling through their respective teams.
- **Left-Aligned Controls**: Expand/Collapse buttons are consistently aligned to the left of titles for better scanability.
- **Granular Filter Bar**: The filter bar includes a dedicated section for managing top-level group visibility separately from the global "Expand/Collapse All".

## Persistence

Collapse states are currently transient to the session (stored in the service instance). Global album progress (`owned`, `duplicates`) continues to be persisted to `LocalStorage` via the `AlbumService`.

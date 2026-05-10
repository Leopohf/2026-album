# Album Structure & Data Logic

This document defines the physical and logical structure of the Panini FIFA World Cup 2026 album and how it's handled by the application.

## Physical Structure

The album is organized into the following sections:

| Section | ID Prefix | Sticker Count | Details |
|---------|-----------|---------------|---------|
| **Initial Logo** | `00` | 1 | Page 0 (Inside cover). |
| **Intro / Hosts** | `FWC 1-8` | 8 | Pages 1-3. Host cities and stadium emblems. |
| **Teams (Groups A-L)** | `[TEAM] 1-20` | 960 | 48 teams, 20 stickers each. |
| **FIFA Museum** | `FWC 9-19` | 11 | History section at the end. |
| **Coca-Cola Extras** | `CC1-14` | 14 | Final two pages (Sponsored). |

**Total Stickers: 994**

### Sticker Types
- **Regular**: Standard player stickers.
- **Special (Shiny)**:
  - Sticker `00`.
  - Sticker `13` of every team (usually the team badge/shield).
  - Selected `FWC` stickers.
  - All **Coca-Cola** stickers (`CC1-14`).

## Data Implementation (Frontend)

### ID Convention
To ensure consistency across the stack, stickers use a normalized ID format:
- **Teams**: `[PREFIX]-01` (e.g., `MEX-01`).
- **Special Sections**: `FWC-[NUMBER]` or `CC[NUMBER]` (e.g., `CC1`).

- **Display Label**: For the UI, numbers are padded (e.g., `CC01`) or space-separated (`MEX 13`) to match the physical album.

### State Management
Implemented in `AlbumService` using **Angular Signals**:
- **`userState`**: A reactive dictionary mapping `stickerId` to ownership and repeat counts.
- **Persistence**: Synchronized with `localStorage` via an `effect()`.
- **Derived State**: `stats` signal computes total progress, missing count, and percentages in real-time.

### JSON Reference
The master definition is located at `src/app/data/stickers.data.ts`.

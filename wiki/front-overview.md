# Frontend Project Overview

The front-end of **2026-album-track** is a modern web application built with Angular to track a sticker album collection.

## Tech Stack
- **Framework**: Angular 21 (v21.2.0)
- **Styling**: Tailwind CSS 4.0
- **State Management**: Angular Signals
- **Package Manager**: pnpm
- **Environment**: Server-Side Rendering (SSR) enabled

## Project Structure
- `src/app/pages/`: Contains the main views (Home, Album, Section, Profile).
- `src/app/components/`: Reusable UI components (Stats panel, Filter bar, Sticker card/grid).
- `src/app/services/`: Business logic and state management (`AlbumService`).
- `src/app/models/`: TypeScript interfaces and types (`Sticker`, `UserAlbum`, etc.).
- `src/app/data/`: Static data for stickers.
- `src/app/pipes/`: Custom pipes for data transformation.

## Key Features
- **Sticker Tracking**: Toggle status with clear labels (Missing, Owned, Duplicate) and manage duplicates.
- **Filtering**: Search by name, ID, or number, and filter by status (all, owned, missing, duplicates) or section.
- **Statistics**: Real-time progress tracking, total count, and duplicates count.
- **Data Persistence**: Uses `localStorage` to save user progress locally.
- **Import/Export**: Capability to import and export album data via JSON.
- **Responsive Design**: Styled with Tailwind CSS for mobile and desktop support.

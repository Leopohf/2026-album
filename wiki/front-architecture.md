# Frontend Architecture

## Routing
The application uses Angular Router with lazy-loaded components for better performance.
- `/`: Home (HomeComponent)
- `/album`: Full Album view
- `/album/:seccion`: Section-specific view
- `/perfil`: User Profile

## State Management (Signals)
The project leverages Angular Signals for reactive state management within the `AlbumService`.
- `_stickers`: Signal containing the full list of stickers.
- `_username`: Signal for the current user's name.

## Core Service: `AlbumService`
Located at `src/app/services/album.service.ts`, it handles:
- **Loading/Saving**: Interacts with `localStorage` and `STICKERS_DATA`.
- **Logic**: Toggling status, updating duplicates, and generating filtered views using `computed` signals.
- **Export/Import**: JSON serialization of user progress.

## Data Models
Defined in `src/app/models/sticker.model.ts`:
- `Sticker`: Represents a single sticker (ID, name, section, type, status).
- `UserAlbum`: Structure for saved user data.
- `AlbumStats`: Aggregated statistics (total, owned, missing, progress %).
- `FilterState`: Defines current search and filter criteria.

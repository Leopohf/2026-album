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
- `collapsedSections`: Signal Set tracking collapsed team sections.
- `collapsedGroups`: Signal Set tracking collapsed tournament groups.

## Core Service: `AlbumService`
Located at `src/app/services/album.service.ts`, it handles:
- **Loading/Saving**: Interacts with `localStorage` and `STICKERS_DATA`.
- **Logic**: Toggling status, updating duplicates, and generating filtered views using `computed` signals.
- **UI State**: Manages persistent (session-based) collapse states for groups and sections.
- **Export/Import**: JSON serialization of user progress.

## Data Models
Defined in `src/app/models/sticker.model.ts`:
- `Sticker`: Represents a single sticker (ID, name, section, type, status).
- `TournamentGroup` / `TeamGroup`: Hierarchical structures for organizing stickers by group and team.
- `UserAlbum`: Structure for saved user data.
- `AlbumStats`: Aggregated statistics (total, owned, missing, progress %).
- `FilterState`: Defines current search and filter criteria.

## Deployment
The project supports multiple deployment strategies depending on scale and infrastructure requirements.

### Option 1: Docker Containerization (SSR)
The application is containerized using Docker for scalable and portable deployment with full Server-Side Rendering support.
- **Strategy**: Multi-stage Docker build.
  - **Stage 1 (Builder)**: Uses `node:22-alpine` and `pnpm` to compile the Angular SSR application.
  - **Stage 2 (Runner)**: Uses a minimal `node:22-alpine` runtime to serve the compiled artifacts.
- **Scalability**: The container is stateless and environment-agnostic, suitable for horizontal scaling on platforms like Kubernetes or AWS ECS.
- **Minimization**: The final image contains only the production artifacts (`dist/`) and the Node.js runtime, ensuring a small footprint and faster deployment.

### Option 2: Static Site Generation (SSG / Prerendering)
For the absolute minimum footprint and maximum simplicity, the project supports full prerendering.
- **Strategy**: Enabled via `"prerender": true` in `angular.json`.
- **Outcome**: Running `pnpm build` generates static HTML files for all discovered routes in `dist/front/browser`.
- **Deployment**: No server required. Simply host the contents of the `browser` folder on any static file server or CDN.
- **Benefits**: Fastest possible initial load time and zero server-side maintenance or cost.

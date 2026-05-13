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

## Deployment Commands
The project includes a `Makefile` in the frontend root to simplify the management of development and production environments.

### Local Development
- `make dev`: Starts the standard Angular development server with HMR.

### Production Environments (Scalable)
Both production options run 3 replicas of the application behind an Nginx load balancer by default.
- `make prod-ssr`: Builds and starts the SSR environment.
- `make prod-ssg`: Builds and starts the SSG environment.

### Utility Commands
- `make stop`: Stops all running Docker environments.
- `make clean`: Removes containers and images created by Docker Compose.
- `make logs-ssr` / `make logs-ssg`: Follows the logs for the respective environment.
- `REPLICAS=5 make prod-ssr`: Start SSR with a custom number of replicas.

### Option 1: Docker Containerization (SSR)
The application is containerized using Docker for scalable and portable deployment with full Server-Side Rendering support.
- **Strategy**: Multi-stage Docker build using `deploy/ssr/Dockerfile`.
  - **Stage 1 (Builder)**: Uses `node:22-alpine` and `pnpm` to compile the Angular SSR application.
  - **Stage 2 (Runner)**: Uses a minimal `node:22-alpine` runtime to serve the compiled artifacts.
- **Scalability**: By using `deploy/docker-compose.ssr.yml`, the application can be scaled to multiple replicas (e.g., 3 instances).
- **Load Balancing**: An Nginx load balancer (`nginx-lb`) is configured to distribute traffic across the SSR instances on port 4000.
- **Minimization**: The final image contains only the production artifacts (`dist/`) and the Node.js runtime, ensuring a small footprint and faster deployment.

### Option 3: Nginx + SSG (Scalable & Load Balanced)
For high-traffic production environments where performance and horizontal scalability are critical, the project provides a dedicated Nginx-based SSG deployment.
- **Strategy**: Multi-stage Docker build using `deploy/ssg/Dockerfile`.
  - **Stage 1 (Builder)**: Compiles the application and generates static HTML/assets via prerendering.
  - **Stage 2 (Runner)**: Uses `nginx:alpine` to serve the `dist/front/browser` directory.
- **Scalability**: The application can be scaled horizontally using `deploy/docker-compose.ssg.yml`.
- **Load Balancing**: A dedicated Nginx load balancer distributes incoming traffic across the SSG replicas.
- **Optimizations**: The custom `deploy/ssg/default.conf` includes:
  - Gzip compression for all text-based assets.
  - SPA routing fallback (`try_files`).
  - Aggressive caching for hashed assets (JS/CSS/Images).
  - Cache-busting for `index.html`.

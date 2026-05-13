# Project Log

Chronological, append-only record of all operations.

## [2026-05-07] - Documentation: Knowledge Base Refinement
- Restructured `wiki/features/` directory for better organization.
- Created `wiki/features/core.md`, `wiki/features/status.md`, and `wiki/features/future.md`.
- Updated `AGENTS.md` (front and back) to include the absolute path of the Obsidian vault and new documentation mandates.
- Updated `wiki/index.md` to reflect the new documentation structure.

## [2026-05-07] - Project Initialization
- Initialized `AGENTS.md` following the Karpathy LLM Wiki pattern.
- Created `raw/` and `wiki/` directory structure.
- Created `wiki/index.md` and `wiki/log.md`.
- Primary Agent role defined as Senior Software Engineer.

## [2026-05-07] - Documentation: Project Overview
- Created root `README.md` with a general project description and structure overview.
- Linked the knowledge base with the Angular frontend project context.

## [2026-05-07] - Infrastructure: Raw Sources
- Created symbolic links in `raw/` pointing to `../front` and `../back`.
- Added `raw/INDEX.md` to document external source locations.

## [2026-05-07] - Album Structure Analysis and Implementation
- Analyzed 53 images of the Panini FIFA World Cup 2026 album.
- Defined total sticker count (996) and distribution (Groups, Intro, History, Coca-Cola).
- Implemented `album.data.ts` with the master definition of all stickers.
- Implemented `AlbumService` with Angular Signals and `localStorage` persistence.
- Documented architectural decisions in `wiki/album-logic.md`.

## [2026-05-07] - Infrastructure: Backend Initialization
- Initialized `../back/AGENTS.md` with instructions for a Senior Go/AWS Developer.
- Created `wiki/back-architecture.md` with the initial technical proposal.
- Updated `wiki/index.md` with the new backend documentation link.

## [2026-05-07] - Documentation: Features Status
- Created `wiki/features.md` to track implemented and planned features.
- Updated `wiki/index.md` to link to the new features section.

## [2026-05-07] - Policy: English Documentation Mandate
- Updated all `AGENTS.md` files (root, backend, frontend) to require all documentation in the Obsidian vault to be in English.
- Translated `README.md`, `wiki/features.md`, and `wiki/back-architecture.md` to English.

## [2026-05-07] - Infrastructure: Backend Submodule
- Converted `raw/back_source` from a local directory to a Git Submodule.
- Linked to `git@github.com:Leopohf/2026-album-track-back.git`.
- Restored `AGENTS.md` to the new submodule directory.
- Translated and updated `raw/INDEX.md` to English.

## [2026-05-08] - UI: Sticker Card Refactoring
- Refactored `StickerCardComponent` UI to improve clarity.
- Replaced "Marcar/Quitar" labels with status-based labels: "Faltante" (Missing), "Adquirida" (Owned), and "Repetida" (Duplicate).
- Updated the action button to have a full border (`border-ink`) and consistent padding.
- Preserved the original minimalist typography and hover effects.

## [2026-05-08] - Architecture: React Integration in Angular
- Defined a strategy to allow UI components to be built with React while keeping Angular as the primary framework.
- Chosen architecture: Generic Angular Wrapper with "Pure Props" state management.
- Documented the integration plan in `wiki/react-integration.md`.
- Planned the migration of `StickerCardComponent` as the first React-based UI component.

## [2026-05-08] - Project Policy: Mandatory pnpm Usage
- Established `pnpm` as the exclusive package manager for the project.
- Updated `AGENTS.md` with the new convention.
- Verified that `README.md` already follows this standard.

## [2026-05-08] - Project Policy: Mandatory React for New UI
- Established that all new UI components MUST be implemented using React.
- Angular templates are deprecated for new UI development.
- Updated `AGENTS.md` and `wiki/react-integration.md` to reflect this mandatory requirement.

## [2026-05-08] - Data: Image Renaming
- Renamed 48 images in `raw/images/` to match their corresponding countries.
- Mapping was derived from the official Panini FIFA World Cup 2026 album order and validated against `extracted_stickers.json`.
- Intro and special section images were preserved with their original names as per project policy.
- Established a clean naming convention (`country-name.heic`) for easier management of raw assets.

## [2026-05-08] - UI: Full Migration to React Complete
- Completed the migration of all remaining components (`FilterBar`, `StatsPanel`, `UserHeader`, `StickerGrid`) to React.
- Every UI component in `src/app/components/` is now a React functional component.
- Angular hosts remain as the bridge to the service layer and Signals.
- Verified system stability with a successful production build using `pnpm`.

## [2026-05-08] - Data: Automated Extraction System
- Created a data extraction utility in `@raw/info-extraction-script/` using Node.js and Gemini Vision API to process physical album images.
- Implemented `extract-stickers.js` with automated schema-based extraction matching the `Sticker` model.
- Documented the extraction process and setup in `wiki/data-extraction.md`.
- Updated `raw/INDEX.md` to include the new utility project.

## [2026-05-09] - UI: Hierarchical Grouping & Collapsible UI
- Introduced a two-level hierarchy: Tournament Groups (A-L) containing Teams (Sections).
- Implemented independent collapse states for both Groups and Teams in `AlbumService`.
- Added granular bulk controls (Expand/Collapse Groups vs Expand/Collapse All) in the `FilterBar`.
- Developed a smooth height-based transition for the collapsible UI using CSS grid.
- Optimized the layout with sticky group headers and left-aligned toggle controls.
- Documented the feature in `wiki/features/hierarchy-collapse.md`.

## [2026-05-10] - Infrastructure: Test Environment Fixes
- Resolved JSX/TSX transformation failures in Vitest by adding `@vitejs/plugin-react`.
- Fixed Angular test environment initialization in `src/test-setup.ts` by explicitly calling `TestBed.initTestEnvironment`.
- Updated `package.json` test script to use `vitest run` for consistent execution.
- Re-enabled and verified 51 tests across 17 suites (both React and Angular).

## [2026-05-09] - Data: Coca-Cola Alliance Stickers
- Integrated 14 special stickers from the Coca-Cola sponsored section.
- Extracted player names from physical album images using Gemini Vision.
- Implemented `coca-cola.data.ts` and integrated it into the master dataset.
- Optimized the `StickerGridReact` UI to hide redundant sub-headers for single-section groups.
- Ensured the Coca-Cola section always appears at the end of the album regardless of alphabetical sorting.
- Updated `wiki/album-logic.md` with new sticker counts and ID conventions (`CC1-14`).

## [2026-05-10] - Policy: Project Conventions
- Created root `GEMINI.md` to establish foundational project standards.
- Mandated English for all code elements, documentation, and UI labels.
- Confirmed `pnpm` as the exclusive package manager and Vanilla CSS for styling.

## [2026-05-10] - Architecture: Testing Strategy
- Defined a comprehensive testing strategy for the Angular + React hybrid architecture.
- Selected **Vitest** as the primary testing framework for its speed and compatibility.
- Documented implementation phases in `wiki/testing-strategy.md`.

## [2026-05-10] - UI: Accent-Insensitive Search
- Implemented `normalizeString` utility in `AlbumService` to strip diacritics and normalize casing.
- Updated filtering logic to allow searching for players like "Martínez" using "martinez".
- Improved search responsiveness and accuracy across the entire sticker dataset.

## [2026-05-10] - Data: Content Completion & Verification
- Added all non-team stickers (Stadiums, Intro, Museum) to the master dataset.
- Verified and cleaned up player names for all 48 teams, removing placeholders.
- Updated `wiki/album-logic.md` with the final sticker count (994) and ID conventions.

## [2026-05-10] - UI: Sticker ID Search & Placeholder Update
- [FIX] Search bug: added sticker ID to search filter in `AlbumService`.
- [UI] Updated search placeholder to "SEARCH BY ID, NAME OR NUMBER..." in `FilterBarReact`.
- [TEST] Added test case for ID search in `album.service.spec.ts`.

## [2026-05-10] - Infrastructure: Documentation Consolidation
- Merged all `AGENTS.md` content into the root `GEMINI.md` to centralize project conventions.
- Renamed subdirectory `AGENTS.md` files to `GEMINI.md` for better integration with Gemini CLI.
- Updated root `GEMINI.md` to include references to scoped instructions for Frontend and Backend.
- Removed all legacy `AGENTS.md` files.

## [2026-05-10] - Infrastructure: Scalable Docker Containerization
- **Task**: Implement bundling, minimization, and horizontal scalability for deployment.
- **Action**: Created a multi-stage `Dockerfile` and `.dockerignore` for the Angular SSR frontend.
- **Rationale**: 
  - Multi-stage builds significantly reduce the final image size by discarding build tools and source code.
  - Using `node:22-alpine` ensures a minimal footprint and reduced security surface.
  - The resulting image is stateless, allowing it to scale horizontally on any container orchestrator.
  - Included extensive inline documentation in the `Dockerfile` to explain the deployment logic.

## [2026-05-12] - Infrastructure: Unified Makefile Interface
- **Task**: Simplify deployment and development with a single command interface.
- **Action**: 
  - Created `raw/front_source/Makefile` with targets for `dev`, `prod-ssr`, `prod-ssg`, and management utilities.
  - Standardized production commands to use background mode (`--detach`) and automated builds.
  - Documented the new command interface in `wiki/front-architecture.md`.
- **Rationale**: 
  - Reduces the cognitive load of remembering complex Docker Compose flags.
  - Provides a single entry point for all deployment and development workflows.

## [2026-05-12] - Infrastructure: Deployment Folder Consolidation
- **Task**: Consolidate all Docker and Nginx configurations into a single folder structure.
- **Action**: 
  - Created `raw/front_source/deploy/` with `ssr/` and `ssg/` subdirectories.
  - Moved Dockerfiles and Nginx configs into their respective rendering strategy folders.
  - Updated `docker-compose.ssr.yml` and `docker-compose.ssg.yml` with correct context and file paths.
  - Updated `wiki/front-architecture.md` to reflect the new file locations.
- **Rationale**: 
  - Organizes deployment artifacts cleanly, separating them from the application source code.
  - Simplifies management of environment-specific configurations.

## [2026-05-12] - Infrastructure: Docker Portability Fix
- **Task**: Resolve "mounts denied" errors in Docker Desktop/WSL environments.
- **Action**: 
  - Replaced host volume mounts for Nginx load balancers with dedicated `Dockerfile.lb` images.
  - Updated `docker-compose.ssr.yml` and `docker-compose.ssg.yml` to build the load balancer images instead of mounting local files.
- **Rationale**: 
  - Avoids dependencies on host-specific "File Sharing" settings.
  - Makes the deployment self-contained and more portable across different operating systems.


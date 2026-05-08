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

## [2026-05-08] - UI: Full Migration to React Complete
- Completed the migration of all remaining components (`FilterBar`, `StatsPanel`, `UserHeader`, `StickerGrid`) to React.
- Every UI component in `src/app/components/` is now a React functional component.
- Angular hosts remain as the bridge to the service layer and Signals.
- Verified system stability with a successful production build using `pnpm`.

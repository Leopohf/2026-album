# Project Log

Chronological, append-only record of all operations.

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

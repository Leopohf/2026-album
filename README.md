# 2026-album-track Knowledge Base

This is the central knowledge repository for the **2026-album-track** project, a modern sticker album tracker.

## Project Structure

Following the **LLM Wiki** pattern, this repository is organized into three layers:

- **`AGENTS.md`**: Defines the agent roles and interaction rules.
- **`raw/`**: Contains immutable source documents, specifications, and base data.
- **`wiki/`**: Contains knowledge synthesis, technical documentation, and project logs.
  - [Wiki Index](wiki/index.md) - Starting point for technical documentation.
  - [Log](wiki/log.md) - Chronological record of operations and changes.

## The Ecosystem

This knowledge repository integrates source code from projects in the `raw/` folder.

### Sources (raw/)
- **[Frontend](raw/front_source/)**: Angular 21 application (Git Submodule).
- **[Backend](raw/back_source/)**: Go server (Git Submodule).

### Frontend (Angular)
The frontend is a high-performance web application built with:
- **Angular 21** & **Signals** for efficient reactive state.
- **Tailwind CSS 4.0** for modern and fluid design.
- **SSR (Server-Side Rendering)** for loading optimization and SEO.

### Backend (Go)
The backend is based on:
- **Go** with clean/hexagonal architecture.
- **PostgreSQL** and **AWS** services.

## Project Goals
1.  **Efficient Persistence**: Manage the album locally with light synchronization.
2.  **User Experience**: Intuitive interface for marking missing and repeated stickers.
3.  **Compound Knowledge**: Keep this "Wiki" updated to facilitate continuous development and architectural decision-making.

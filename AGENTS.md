# AGENTS.md - Project Schema & Agent Definitions

This file defines the architecture, conventions, and workflows for the **2026-album-track** project, following the **LLM Wiki** pattern.

## Role: Senior Software Engineer
The primary agent acts as a Senior Software Engineer responsible for:
- Developing and maintaining the project codebase.
- Maintaining a persistent, compounding knowledge base (the Wiki).
- Providing technical advice and architectural guidance.
- Keeping records of all significant decisions and operations.

## Project Structure (LLM Wiki Pattern)

### 1. `raw/` (Immutable Source)
- Contains immutable source documents, transcripts, research papers, and data exports.
- **Rules**: LLM reads from here but NEVER modifies.

### 2. `wiki/` (Persistent Synthesis)
- Contains LLM-generated markdown files synthesizing knowledge from the `raw/` layer.
- **Core Files**:
  - `wiki/index.md`: Content-oriented catalog of all wiki pages.
  - `wiki/log.md`: Chronological, append-only record of all operations.
- **Entity Pages**: Dedicated pages for specific concepts, technologies, or project modules.

### 3. `schema` (Project Rules)
- This file (`AGENTS.md`) acts as the schema, defining how the LLM interacts with the project.

## Workflows

### Ingest
- When new information is added to `raw/`, the LLM updates relevant pages in `wiki/`.
- Updates should include cross-references and highlight contradictions.
- Each ingest operation is recorded in `wiki/log.md`.

### Query
- Answering technical or architectural questions using the `wiki/` and `raw/` data.
- Valuable insights from queries are filed back into the `wiki/` as new or updated pages.

### Lint
- Periodically check the `wiki/` for:
  - Stale claims or outdated technical advice.
  - Broken links or missing cross-references.
  - Contradictions between pages.

## Conventions
- **Language**: Spanish (as per user preference in initial interaction) and English (for technical documentation).
- **Naming**: Descriptive, kebab-case for filenames.
- **Updates**: Incremental and atomic.

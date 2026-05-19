# Project Schema & Agent Definitions (GEMINI.md)

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
- This file (`GEMINI.md`) acts as the schema, defining how the LLM interacts with the project.

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

## Project Conventions

### Scoped Instructions
- **Frontend**: [raw/front_source/GEMINI.md](raw/front_source/GEMINI.md)
- **Backend**: [raw/back_source/GEMINI.md](raw/back_source/GEMINI.md)

### Language Standards
- **English Only**: All code elements including variable names, class names, method names, property names, and action types MUST be written in English.
- **Documentation**: All comments, commit messages, and documentation files must be written in English.
- **UI Labels**: User interface text and labels must be in English.
- **Obsidian Vault**: MANDATORY for all documentation within the Obsidian vault, including `wiki/` and `README.md`. Spanish is only allowed for direct communication with the user if they initiate it.

### Coding Style
- **Frameworks**: Follow existing patterns in the project (Angular with React integration).
- **Styling**: Prefer Vanilla CSS for styling.
- **Package Manager**: Use `pnpm` exclusively.

### File Naming & Updates
- **Naming**: Descriptive, kebab-case for filenames.
- **Updates**: Incremental and atomic.

### Cost Management
- **Cost Warning**: If any feature, library, service, or tool proposed for the project incurs a cost (one-time or subscription), you MUST warn the user before proceeding.
- **Decision-Making**: Provide the user with the option to either search for a free alternative or proceed with the paid option.

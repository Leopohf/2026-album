# 2026-album-track Backend - Agent Instructions

You are a Senior Software Developer expert in **Go (Golang)**, relational and non-relational databases, and **AWS**. You are responsible for the server-side logic, infrastructure, and data integrity of the 2026-album-track project.

## Tech Stack & Architecture

- **Language**: Go (latest stable version).
- **Architecture**: Clean Architecture or Hexagonal Architecture (prefer explicit over implicit).
- **Databases**:
  - **Relational**: PostgreSQL (for structured data like user accounts and official sticker metadata).
  - **NoSQL**: Redis (for caching/sessions) or DynamoDB if applicable for scale.
- **Infrastructure**: AWS (Lambda, API Gateway, S3, RDS/DynamoDB).

## Backend-Specific Rules

### 1. Go Idiomatic Patterns
- Use standard library whenever possible.
- Explicit error handling: `if err != nil { return err }`.
- Proper use of `context.Context` for cancellation and timeouts.

### 2. Database & Data Integrity
- Migrations: All schema changes must be versioned and reproducible.
- Validation: Strict input validation before processing data.

### 3. Cloud Native (AWS)
- Security: IAM roles with least privilege principle.

### 4. Obsidian Vault Integration (Assistant)
- **Vault Path**: `/mnt/data/Projects/personal/2026-album-track/album-project` (Absolute)
- **Location**: `../../` (Relative to this project)
- **Mandate**: After every significant backend change, you MUST update the central vault:
  - All documentation MUST be in **English**.
  - `wiki/log.md`: Record the technical changes, rationale, and date.
  - `wiki/back-architecture.md`: Update or create this file to reflect the evolving server design.

### 5. API Documentation Mandate
- **Single Source of Truth**: All backend endpoints developed or planned MUST be documented in the OpenAPI 3.0.0 specification file located at `api/api-spec.json`.
- **Parity Requirement**: Any addition or modification to the API routes, request payloads, query parameters, or response schemas must be reflected in `api/api-spec.json` immediately as part of the implementation process.

## Cost Management
- **Cost Warning**: If any feature, library, service, or tool proposed for the project incurs a cost (one-time or subscription), you MUST warn the user before proceeding.
- **Decision-Making**: Provide the user with the option to either search for a free alternative or proceed with the paid option.

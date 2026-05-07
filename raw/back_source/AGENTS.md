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
- **Location**: `../album-project/`
- **Mandate**: After every significant backend change, you MUST update the central vault:
  - `wiki/log.md`: Record the technical changes, rationale, and date.
  - `wiki/back-architecture.md`: Update or create this file to reflect the evolving server design.

## Implementation Workflow

1. **Schema First**: Define database models and API contracts before implementation.
2. **Testing**: Unit tests are mandatory for business logic.
3. **Vault Update**: Document the change in the vault before closing the task.

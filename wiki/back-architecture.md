# Backend Architecture

## Technology Stack
- **Language**: Go (Golang)
- **Architecture**: Serverless (AWS Lambda)
- **Database**: PostgreSQL (planned)
- **Deployment**: AWS (Lambda, API Gateway)

## Directory Structure (Go Project)
Located in `raw/back_source`:
- `api/`: Contains API definitions and specifications.
  - `api-spec.json`: OpenAPI 3.0.0 specification file for testing the endpoints via Apidog or Swagger.
- `cmd/api/`: Entrypoint for AWS Lambda.
- `cmd/local/`: Entrypoint for local development (standard HTTP server).
- `internal/handler/`: Core business logic and request handlers (transport-agnostic).
- `Makefile`: Build and automation tool.

## Build & Deployment
- **Architecture**: `linux/arm64` (Graviton2/3 for cost efficiency).
- **Runtime**: `provided.al2023`.
- **Package**: `bootstrap.zip` containing the `bootstrap` binary.

## Local Development
To run the API locally:
```bash
cd raw/back_source
make run
```
The server will be available at `http://localhost:8080`.

## API Specification
To facilitate testing and automated mocking, the backend project includes an OpenAPI 3.0.0 specification:
- **Specification File**: [api-spec.json](file:///mnt/data/Projects/personal/album-project/raw/back_source/api/api-spec.json)
- **Integration**: Designed to be imported directly into testing tools like **Apidog**, Swagger UI, or Postman.
- **Project Mandate**: As defined in `raw/back_source/GEMINI.md`, all developed and planned backend endpoints must be documented here as the single source of truth.
- **Current Endpoints**:
  - `GET /`: Welcomes the user with `Hello from Album API (Go)!`.

## Integration Strategy
The backend uses `github.com/aws/aws-lambda-go/events` to model API Gateway requests. The `internal/handler` package contains logic that can be invoked by both the Lambda wrapper and the local HTTP server, ensuring behavioral parity between environments.

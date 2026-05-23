# Album API (Backend)

## Goal
The goal of this project is to provide a scalable, cost-effective backend for the 2026 Album Track application. It is built using **Go** and designed to run as an **AWS Lambda** function behind an API Gateway, managing user collections, sticker metadata, and synchronization.

## Architecture
- **Language**: Go (Golang)
- **Deployment**: AWS Lambda (Serverless)
- **Architecture**: `linux/arm64` (AWS Graviton) for better performance and lower costs.
- **Entrypoints**:
  - `cmd/api`: The production entrypoint for AWS Lambda.
  - `cmd/local`: A local development server that simulates API Gateway requests.
- **Core Logic**: Located in `internal/handler/`, making it transport-agnostic and easy to test.

## Local Development

To run the API locally for development and testing:

1.  **Navigate to the backend directory**:
    ```bash
    cd raw/back_source
    ```

2.  **Start the local server**:
    ```bash
    make run
    ```
    The server will start at `http://localhost:8080`.

3.  **Test the endpoint**:
    ```bash
    curl http://localhost:8080
    ```

## Deployment to AWS

The project is optimized for the `provided.al2023` runtime on AWS Lambda using the ARM64 architecture.

### 1. Build the Deployment Package
Run the following command to compile the binary for ARM64 and package it into a zip file:
```bash
make build
```
This will create a `bootstrap.zip` file in the root of the project.

### 2. Upload to AWS Lambda
- **Runtime**: `Amazon Linux 2023` (provided.al2023)
- **Architecture**: `arm64`
- **Handler**: `bootstrap` (This is the name of the binary inside the zip)
- **Upload**: Upload the `bootstrap.zip` file via the AWS Console, CLI, or your preferred IaC tool (e.g., Terraform, AWS SAM).

## Project Structure
- `cmd/`: Application entrypoints.
- `internal/`: Private library code, including the `handler` logic.
- `Makefile`: Automation for building and running the project.
- `go.mod` / `go.sum`: Go module dependencies.

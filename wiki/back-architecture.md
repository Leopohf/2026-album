# Backend Architecture

*Note: This page is in the initial design phase.*

## Technology Proposal
- **Language**: Go (Golang)
- **Database**: PostgreSQL (Relational)
- **Cloud**: AWS (Lambda/API Gateway)

## Main Components
1. **API Gateway**: Entry point for the frontend.
2. **Lambda Functions**: Serverless business logic.
3. **RDS/PostgreSQL**: Persistent storage for users and collections.

## System Integration
The backend will provide the necessary endpoints for the Angular frontend to synchronize user albums, allowing persistence to go beyond `localStorage`.

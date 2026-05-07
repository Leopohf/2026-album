# Raw Sources Index

This folder contains the original source code repositories for the project.

## Linked Projects
- **[Front-end Source](front_source/)**: Git Submodule (Angular 21). Linked via SSH.
- **[Back-end Source](back_source/)**: Git Submodule (Go). Linked via SSH.

## Usage Instructions
These directories allow the agent to access the original source code for analysis and synthesis into the `wiki/`. Following the LLM Wiki pattern, the content of these paths should be treated as **read-only** from the perspective of the Wiki's knowledge base, although they are active working areas for development.

To clone this project with all its dependencies:
```bash
git clone --recursive [REPO-URL]
```

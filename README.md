# 2026-album-track Monorepo

This is the unified monorepo for the **2026-album-track** project, a modern sticker album tracker. It is built as an **Nx workspace** with a `pnpm` monorepo configuration, consolidating the frontend, backend, assets, and documentation into a single, cohesive repository.

---

## 🏗️ Workspace Architecture

The project is structured logically into apps, assets, and knowledge base layers:

```
album-project/                    ← Unified Nx Monorepo
├── nx.json
├── package.json                  ← Root dependencies and task commands
├── pnpm-workspace.yaml           ← Declares local workspace packages
├── tsconfig.base.json            ← Shared base TypeScript configuration
├── .gitignore
├── .gitattributes                ← Tracks images via Git LFS
│
├── apps/
│   ├── album-front/              ← Frontend (Angular 21 + React 19 hybrid)
│   │   ├── lint/                 ← @album/lint (ESLint flat config workspace package)
│   │   ├── src/                  ← Application source code
│   │   ├── project.json          ← Nx target definitions for frontend
│   │   └── package.json          ← Frontend specific dependencies
│   │
│   └── album-backend/            ← Backend (Go HTTP server & AWS Lambda API)
│       ├── cmd/                  ← Entry points (local development & production lambda)
│       ├── internal/             ← Clean/hexagonal API architecture
│       ├── Makefile              ← Go compilation and deployment scripting
│       └── project.json          ← Nx target definitions for backend
│
├── assets/
│   └── images/                   ← Album sticker images (Git LFS tracked)
│
└── wiki/                         ← Technical documentation and project logs
    ├── index.md                  ← Index of the system documentation
    └── log.md                    ← Append-only chronological system change logs
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20+ or v22+
- **pnpm**: v10+ (exclusive package manager)
- **Go**: v1.21+ (for backend)
- **Git LFS**: Installed and initialized (`git lfs install`)

### 📦 Setup Workspace

Install all dependencies and link the workspace packages automatically:
```bash
pnpm install
```

---

## 🛠️ CLI Reference (Nx Tasks)

Instead of navigating into individual directories, run commands directly from the monorepo root using `pnpm` and `nx`.

### 💻 Frontend Commands
- **Start local development server (Angular HMR)**:
  ```bash
  pnpm front:serve
  # or: npx nx run album-front:serve
  ```
- **Lint frontend and template files (using custom `@album/lint`)**:
  ```bash
  pnpm front:lint
  # or: npx nx run album-front:lint
  # Autofix: npx nx run album-front:lint --fix
  ```
- **Run vitest suite (React + Angular specs)**:
  ```bash
  pnpm front:test
  # or: npx nx run album-front:test
  ```
- **Build frontend for production (Angular SSR/SSG compile)**:
  ```bash
  pnpm front:build
  # or: npx nx run album-front:build
  ```

### ⚙️ Backend Commands
- **Start local API development server (Go HTTP)**:
  ```bash
  pnpm back:serve
  # or: npx nx run album-backend:serve
  ```
- **Compile Go backend binary**:
  ```bash
  pnpm back:build
  # or: npx nx run album-backend:build
  ```
- **Clean Go build output**:
  ```bash
  npx nx run album-backend:clean
  ```

### 🤝 Multi-project Tasks
- **Lint all projects**:
  ```bash
  pnpm lint:all
  ```
- **Test all projects**:
  ```bash
  pnpm test:all
  ```

---

## 📚 Technical Documentation (LLM Wiki)

Documentation is maintained under the [wiki/](wiki/index.md) folder. Key references:
- **[Wiki Index](wiki/index.md)**: Entry point for the knowledge base.
- **[Linter Specifications](wiki/linter.md)**: Full details on our modern hybrid ESLint configurations.
- **[Frontend Architecture](wiki/front-architecture.md)**: Deep-dive into Angular Signals, React UI wrapper, and production docker deployments.
- **[Project Logs](wiki/log.md)**: Every major infrastructure or codebase change is logged chronologically.

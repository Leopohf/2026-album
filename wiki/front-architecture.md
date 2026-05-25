# Frontend Architecture

## Routing
The application uses Angular Router with lazy-loaded components for better performance.
- `/`: Home (HomeComponent)
- `/album`: Full Album view
- `/album/:section`: Section-specific view
- `/profile`: User Profile
- `**` (Wildcard): Fallback Page Not Found (NotFoundComponent)

## State Management (Signals)
The project leverages Angular Signals for reactive state management within the `AlbumService`.
- `_stickers`: Signal containing the full list of stickers.
- `_username`: Signal for the current user's name.
- `collapsedSections`: Signal Set tracking collapsed team sections.
- `collapsedGroups`: Signal Set tracking collapsed tournament groups.

## Core Service: `AlbumService`
Located at `src/app/services/album.service.ts`, it handles:
- **Loading/Saving**: Interacts with `localStorage` and `STICKERS_DATA`.
- **Logic**: Toggling status, updating duplicates, and generating filtered views using `computed` signals.
- **UI State**: Manages persistent (session-based) collapse states for groups and sections.
- **Export/Import**: JSON serialization of user progress.

## Data Models
Defined in `src/app/models/sticker.model.ts`:
- `Sticker`: Represents a single sticker (ID, name, section, type, status).
- `TournamentGroup` / `TeamGroup`: Hierarchical structures for organizing stickers by group and team.
- `UserAlbum`: Structure for saved user data.
- `AlbumStats`: Aggregated statistics (total, owned, missing, progress %).
- `FilterState`: Defines current search and filter criteria.

## Deployment & Task Orchestration
To support clean monorepo management and ensure maximum compatibility with CI/CD pipelines, the project employs a **Unified Task-Driven Architecture** that marries a language-native execution layer with an Nx orchestration layer.

### The Hybrid Architecture Pattern
1. **Execution Layer (Local Makefile):** A portable `Makefile` lives in `apps/album-front/` containing pure docker compose and Kubernetes commands. This ensures CI/CD runners or ops pipelines that do not have Node/Nx installed can still build or deploy the application by executing native shell targets inside this folder.
2. **Orchestration Layer (Nx Targets):** All local Makefile commands are registered in `apps/album-front/project.json` using the `nx:run-commands` executor. This unifies all frontend operations under the single root `nx` runner, allowing developers and root-level CI workflows to execute them from the monorepo root.

### Available Targets & Executions

| Command Type | Root-Level Monorepo Command (`nx`) | Isolated Direct Directory Command (`make`) | Description |
| :--- | :--- | :--- | :--- |
| **Local Dev Server** | `pnpm nx serve album-front` | `make dev` *(runs pnpm start)* | Starts the standard Angular development server with HMR. |
| **Build Front** | `pnpm nx build album-front` | *Internal Angular CLI* | Compiles the production build of the frontend. |
| **Test Front** | `pnpm nx test album-front` | *Internal Vitest CLI* | Runs unit tests using Vitest. |
| **Lint Front** | `pnpm nx lint album-front` | *Internal ESLint CLI* | Validates codebase quality via parallel linter. |
| **Deploy SSR** | `pnpm nx deploy-ssr album-front` | `make prod-ssr` | Builds and starts the scalable multi-replica SSR environment. |
| **Deploy SSG** | `pnpm nx deploy-ssg album-front` | `make prod-ssg` | Builds and starts the scalable multi-replica SSG environment. |
| **Logs SSR** | `pnpm nx logs-ssr album-front` | `make logs-ssr` | Follows and displays real-time logs for SSR replicas. |
| **Logs SSG** | `pnpm nx logs-ssg album-front` | `make logs-ssg` | Follows and displays real-time logs for SSG replicas. |
| **K8s Apply SSR** | `pnpm nx k8s-apply-ssr album-front` | `make k8s-apply-ssr` | Deploys the SSR manifests to a active Kubernetes cluster. |
| **K8s Delete SSR** | `pnpm nx k8s-delete-ssr album-front` | `make k8s-delete-ssr` | Clears all SSR Kubernetes deployments and services. |
| **K8s Apply SSG** | `pnpm nx k8s-apply-ssg album-front` | `make k8s-apply-ssg` | Deploys the SSG manifests to a active Kubernetes cluster. |
| **K8s Delete SSG** | `pnpm nx k8s-delete-ssg album-front` | `make k8s-delete-ssg` | Clears all SSG Kubernetes deployments and services. |
| **Stop Environment** | `pnpm nx stop album-front` | `make stop` | Stops all running Docker Compose environment containers. |
| **Clean Environment** | `pnpm nx clean album-front` | `make clean` | Tears down Compose containers and prunes cached images. |

*Note: You can pass custom options down to local Makefiles using the `--args` flag, e.g., scaling replicas on deployment:*
```bash
pnpm nx deploy-ssr album-front --args="REPLICAS=5"
```

### Option 1: Docker Containerization (SSR)
The application is containerized using Docker for scalable and portable deployment with full Server-Side Rendering support.
- **Strategy**: Multi-stage Docker build using `apps/album-front/deploy/ssr/Dockerfile`.
  - **Stage 1 (Builder)**: Uses `node:22-alpine` and `pnpm` to compile the Angular SSR application.
  - **Stage 2 (Runner)**: Uses a minimal `node:22-alpine` runtime to serve the compiled artifacts.
- **Scalability**: By using `apps/album-front/deploy/docker-compose.ssr.yml`, the application can be scaled to multiple replicas (e.g., 3 instances).
- **Load Balancing**: An Nginx load balancer (`nginx-lb`) is configured to distribute traffic across the SSR instances on port 4000.
- **Minimization**: The final image contains only the production artifacts (`dist/`) and the Node.js runtime, ensuring a small footprint and faster deployment.

### Option 3: Nginx + SSG (Scalable & Load Balanced)
For high-traffic production environments where performance and horizontal scalability are critical, the project provides a dedicated Nginx-based SSG deployment.
- **Strategy**: Multi-stage Docker build using `apps/album-front/deploy/ssg/Dockerfile`.
  - **Stage 1 (Builder)**: Compiles the application and generates static HTML/assets via prerendering.
  - **Stage 2 (Runner)**: Uses `nginx:alpine` to serve the `dist/front/browser` directory.
- **Scalability**: The application can be scaled horizontally using `apps/album-front/deploy/docker-compose.ssg.yml`.
- **Load Balancing**: A dedicated Nginx load balancer distributes incoming traffic across the SSG replicas.
- **Optimizations**: The custom `apps/album-front/deploy/ssg/default.conf` includes:
  - Gzip compression for all text-based assets.
  - SPA routing fallback (`try_files`).
  - Aggressive caching for hashed assets (JS/CSS/Images).
  - Cache-busting for `index.html`.

## Security & Hardening

To protect the application against DDoS floods, connection starvation, payload injection, and container-level process leaks, a robust multi-layer security architecture has been implemented across both the SSR and SSG deployment patterns.

### 1. Express Server Protection (SSR)
When running the SSR engine, the Node/Express server (`apps/album-front/src/server.ts`) is fortified using the following middleware and configurations:
- **Helmet**: Enforces secure HTTP headers, including standard Content Security Policies (CSP), frameguard, cross-origin restrictions, and HSTS.
- **Dynamic CORS Filtering**: Utilizes an environment-variable-backed allowed origin validator (`ALLOWED_ORIGINS`). If no origins are configured, it safely falls back to local development defaults (`localhost:4200`, `localhost:4000`, `localhost:8080`).
- **HTTP Parameter Limits**: Caps incoming JSON and URL-encoded request payloads at `1kb` to prevent buffer overflow attacks.
- **Rate Limiting**: Employs `express-rate-limit` to restrict clients to `100 requests per 15 minutes` per IP address.
- **Compression**: Gzip-compresses responses to save bandwidth and reduce resource consumption during heavy traffic.
- **Exception Boundaries**: Catch-all global error-handling prevents stack trace leakage to the client, logging errors securely on the server side instead.

### 2. Nginx Load Balancers (SSR & SSG)
Both SSR (`apps/album-front/deploy/ssr/lb.conf`) and SSG (`apps/album-front/deploy/ssg/lb.conf`) Nginx configurations are engineered with modern security profiles:
- **Cloudflare Real IP Restoration**: Maps Cloudflare proxy IPs back to authentic client IPs using the `set_real_ip_from` modules and `CF-Connecting-IP` headers. This prevents rate limit pooling and ensures correct client tracking.
- **Connection & Request Limiting**:
  - `limit_req`: Caps request frequency at `30 requests/second` with a burst buffer of `10`.
  - `limit_conn`: Limits concurrent connections to `20` per IP to stop connection-starvation attacks (Slowloris).
- **SSL/TLS & HSTS Dual-Protocol Configuration**:
  - Ports `80` (HTTP) and `443` (HTTPS) are exposed.
  - Generates self-signed certificates out-of-the-box inside the Docker image as a fallback. This supports Cloudflare's "Full" SSL/TLS proxying seamlessly and avoids container startup crashes when custom certificates aren't mounted.
  - Enforces `Strict-Transport-Security` (HSTS) with a `max-age` of 1 year.
- **Buffer & Timeout Boundaries**:
  - Restricts request body size (`client_max_body_size 1k`).
  - Implements strict headers/body timeouts (`client_body_timeout 10s`, `client_header_timeout 10s`, `keepalive_timeout 65s`, `send_timeout 10s`) to mitigate slow-headers attacks.

### 3. Docker Container Hardening
The containers are built for minimum privilege and secure operations:
- **Non-Root Execution**: Runs under the unprivileged `node` user in SSR and `nginx` user (`nginxinc/nginx-unprivileged` base) in SSG. Port configurations map to unprivileged ports (`8080` internally for HTTP and `8443` for HTTPS).
- **Process Supervision (`tini`)**: The SSR Docker container utilizes `tini` as PID 1 to reap zombie processes and correctly forward kernel signals (e.g. `SIGTERM`, `SIGINT`), allowing graceful container shutdown.
- **Container Healthchecks**: Added standard healthchecks to detect runtime lockups and trigger automatic container replacement by orchestrators.

### 4. Kubernetes Manifests Hardening (`apps/album-front/deploy/k8s/`)
Kubernetes resources (`apps/album-front/deploy/k8s/ssr/` and `apps/album-front/deploy/k8s/ssg/`) enforce production-grade security:
- **Pod Security Contexts**:
  - `runAsNonRoot: true`
  - `runAsUser: 101` (Nginx unprivileged) or `1000` (Node unprivileged).
  - `readOnlyRootFilesystem: true` to prevent any runtime modification of application code.
- **Writable Mounts**: Mounts a local `emptyDir` volume at `/tmp` to allow the read-only Nginx container to write dynamic cache and PID files safely.
- **Network Policies**: Strictly restricts incoming traffic to the application pods, allowing connections only from the Ingress controller.
- **Horizontal Pod Autoscaling (HPA)**: Scales replicas dynamically between `3` and `10` based on CPU and Memory utilization thresholds to absorb traffic spikes.
- **Pod Disruption Budgets (PDB)**: Enforces `minAvailable: 2` to guarantee high availability during cluster upgrades or nodes draining.

## Linter & Code Quality (ESLint Flat Config)

To maintain code health across a complex hybrid Angular + React environment without bloating the frontend codebase, a decoupled linter architecture has been established.

### 1. Parallel Linter Package (`apps/album-front/lint`)
Instead of bloating the primary frontend dependencies, all linting tools, engines, and rulesets are defined in a local package located at `apps/album-front/lint`. This ensures:
- **Zero Bloat**: The primary frontend dependencies remain focused strictly on the application source, while development quality-assurance dependencies live in their own package.
- **Easy Maintenance**: Rule modifications or package upgrades for TypeScript, Angular, or React linting occur in a single dedicated configuration directory.

### 2. Hybrid Flat Config Rules (`apps/album-front/lint/index.js`)
The configuration is written using ESLint v9+ **Flat Config**, targeting distinct file patterns for isolated validation:
- **Base TS/JS Rules**: Standard rules targeting code quality, strict typing compliance, and forbidding unused symbols across all `.js`, `.ts`, and `.tsx` files.
- **Angular-Specific Rules (`**/*.ts`)**: Evaluates Angular directives and components selectors, Signal inputs/outputs, and lifecycle hooks using `@angular-eslint/eslint-plugin`.
- **Angular Template Rules (`**/*.html`)**: Scans templates for correct syntax and template accessibility patterns using `@angular-eslint/template-parser`.
- **React UI Rules (`**/*.tsx`)**: Validates hook rules and component functional purity using `eslint-plugin-react` and `eslint-plugin-react-hooks`.
- **Prettier Integration**: Runs `eslint-config-prettier` at the end to automatically disable any formatting rules that might conflict with the existing `.prettierrc`.

### 3. Connection and Execution
- The package is declared in `pnpm-workspace.yaml` and resolved in `apps/album-front/package.json` using the workspace protocol:
  ```json
  "@album/lint": "workspace:*"
  ```
- A simple wrapper file `apps/album-front/eslint.config.js` imports and default-exports the shared config:
  ```javascript
  import albumConfig from '@album/lint';
  export default albumConfig;
  ```
- Scripts are exposed in the root `package.json` and frontend's `project.json` to run validation via Nx:
  - `npx nx run album-front:lint`: Runs ESLint over all directories inside the frontend scope.
  - `npx nx run album-front:lint --fix`: Automatically applies safe autofixes.

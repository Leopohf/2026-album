# Panini World Cup 2026 Album Tracker

A minimalist, high-performance web application to track your 2026 Panini World Cup sticker collection.

## Technical Stack

- **Framework**: Angular 21+ (Standalone Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4+ (Minimalist, Utility-first)
- **State Management**: Angular Signals
- **Persistence**: LocalStorage (with SSR safety)
- **SSR/SSG**: Angular SSR enabled

## Features

- **User Management**: Simple username-based sessions stored locally.
- **Sticker Collection**: Track owned stickers, missing ones, and duplicates. Enhanced UI with status labels (Missing, Owned, Duplicate) and outlined design.
- **Advanced Filtering**: Filter by name, number, section, or status (Owned, Missing, Duplicates).
- **Team-Centric View**: Stickers are organized in a two-level hierarchy: **Tournament Groups** (e.g., Group A, Group B) and **Teams**.
- **Collapsible UI**: All Groups and Teams are independently collapsible with smooth, fluid transitions.
- **Bulk Collapse Controls**: Dedicated actions in the filter bar to expand/collapse only Groups or the entire hierarchy at once.
- **Progress Tracking**: Real-time progress bar and metrics (Total, Owned, Missing, Duplicates).
- **Export/Import**: Backup or share your album state via JSON.
- **Responsive Design**: Optimized for mobile and desktop using a minimalist "ink-on-paper" aesthetic.

## Data Standards

Every team in the application follows a strict structural standard to ensure consistency across the 48 sections:

- **20 Stickers per Team**: Consistent size for all participants.
- **Federation Logo (#1)**: Always typed as `crest` and displayed first in the grid.
- **Team Picture (#13)**: Always typed as `intro` and displayed second in the grid.
- **Players**: All other stickers are typed as `player` and ordered numerically.
- **Sticker Types**: The full set of sticker types is `player`, `stadium`, `crest`, and `intro`.
- **Hierarchical Organization**: Teams are grouped under their respective Tournament Group (Group A through Group L), plus special sections (FWC and Coca-Cola).

## Architecture

- **Surgical State**: All state transformations are handled via `AlbumService` using Signals, including persistent collapse states.
- **Hybrid Framework**: Angular handles routing, services, and page-level templates, while **React (v19)** powers the component-level UI layer (sticker cards, grids, filter bar, stats panel, user header) for high performance and smooth animations.
- **Modular Pages**:
  - `Home`: User login/selection.
  - `Album`: Main collection grid with filters.
  - `Section`: Focused view for specific sections (Teams, Stadiums, etc.).
  - `Profile`: Data management and duplicate listing.
- **Clean Components**: OnPush change detection and pure logic.

## Getting Started

### Prerequisites

- **Node.js**: Latest LTS recommended.
- **pnpm**: Used exclusively for package management.
- **Docker & Docker Compose**: Required for production-like deployment (SSR/SSG).
- **Make**: (Optional) Recommended for running automated tasks.

### Development

For local development with hot-reloading:

```bash
pnpm install
make dev
# or
pnpm start
```

### Deployment

The project supports both **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)** through a load-balanced Docker environment.

#### SSR Deployment (Server-Side Rendering)

Optimized for dynamic content and real-time state consistency.

```bash
make prod-ssr
```
The application will be available at `http://localhost:8080`.

#### SSG Deployment (Static Site Generation)

Optimized for high-performance static delivery.

```bash
make prod-ssg
```
The application will be available at `http://localhost:8080`.

#### Management

```bash
# View environment logs
make logs-ssr
make logs-ssg

# Stop all running environments
make stop

# Clean up all containers and images
make clean
```

## Design Philosophy

- **Minimalist**: No gradients, shadows, or decorative animations.
- **Typography-centric**: Using IBM Plex Mono for a technical, "ledger-like" feel.
- **Interaction**: Fast, tactical feedback via simple color/opacity changes.

## Deployment Deep Dive

### Local Development Workflow

The local environment is optimized for rapid iteration.

1.  **Strict Dependencies**: We use `pnpm` exclusively. This ensures deterministic builds and saves disk space via content-addressed storage.
    ```bash
    pnpm install
    ```
2.  **Dev Server**: Run `pnpm start` (or `make dev`). This uses the Angular CLI dev server with HMR (Hot Module Replacement) enabled.
3.  **Mock Data**: The application currently uses static data located in `src/app/data/`. To simulate different collection states, you can modify `stickers.data.ts` or use the **Import/Export** feature in the UI.
4.  **Testing**: 
    - `pnpm test`: Run Vitest unit tests.
    - `pnpm test:coverage`: Run tests with V8 coverage report.

### Production Architecture (Docker Compose)

Our production-ready setup uses a **Load Balancer + Replicas** pattern.

-   **Load Balancer (Nginx)**: A dedicated container (`nginx-lb`) acts as the entry point. It handles incoming traffic on port `8080` and distributes it across multiple application instances using a round-robin strategy.
-   **App Replicas**: Multiple instances of the Angular SSR/SSG app run in parallel. This provides redundancy and horizontal scaling.
-   **Statelessness**: The application is entirely stateless. User progress is persisted in the browser's `localStorage`, allowing any backend replica to handle any request safely.

#### Scaling the Environment
You can dynamically adjust the number of app instances using the `REPLICAS` variable:
```bash
make prod-ssr REPLICAS=5
```
This is ideal for handling traffic spikes or testing load distribution locally.

### Kubernetes (K8s) Integration

For enterprise-grade orchestration, the application ships with ready-to-use Kubernetes manifests. Since the app is already containerized, the transition from Docker Compose is seamless.

#### Why Kubernetes?
While Docker Compose is great for single-node setups, Kubernetes provides:
-   **Self-Healing**: Automatically restarts failed containers.
-   **Auto-Scaling**: Scales replicas based on CPU/Memory usage (HPA).
-   **Zero-Downtime Updates**: Performs rolling updates without dropping requests.

#### Infrastructure Components
The project includes pre-configured manifests under `deploy/k8s/ssr/` and `deploy/k8s/ssg/`:

1.  **Deployment**: Manages 3 application pod replicas by default. Uses the same images built by the project's Dockerfiles. Includes pre-configured `readinessProbe` and `livenessProbe` for reliability, and `resources.requests`/`resources.limits` for fair scheduling.
2.  **Service (ClusterIP)**: Provides a stable internal IP for the app pods (SSR targets port `4000`, SSG targets port `80`).
3.  **Ingress**: Replaces the `nginx-lb` container. It leverages the cluster's native Ingress Controller (like NGINX or Traefik) to manage SSL termination and routing.

#### Commands & Usage

Before applying manifests, you must build and tag your images so your cluster can pull them:

```bash
# For SSR
docker build -t album-app-ssr:latest -f deploy/ssr/Dockerfile .

# For SSG
docker build -t album-app-ssg:latest -f deploy/ssg/Dockerfile .
```

> **Note**: If using a remote cluster, you must tag these with your registry URL (e.g., `myregistry.com/album-app-ssr:latest`) and push them. Update the `image` field in `deploy/k8s/*/deployment.yaml` accordingly.

To deploy using `make`:

```bash
# Apply SSR manifests
make k8s-apply-ssr

# Apply SSG manifests
make k8s-apply-ssg

# Remove manifests
make k8s-delete-ssr
make k8s-delete-ssg
```

Or using `kubectl` directly:

```bash
kubectl apply -f deploy/k8s/ssr/
```

#### Modifying for Custom Needs
-   **Environment Variables**: Use Kubernetes `ConfigMaps` or `Secrets` to inject configuration (e.g., API URLs, Feature Flags) without rebuilding images.
-   **Resource Limits**: Adjust the existing `resources.requests` and `resources.limits` in your Deployment manifest to match your workload requirements.
-   **Probes**: Tune the pre-configured `livenessProbe` and `readinessProbe` intervals in the Deployment manifests as needed for your environment.
